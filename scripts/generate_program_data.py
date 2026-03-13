#!/usr/bin/env python3

from __future__ import annotations

import json
import sys
from collections import Counter, defaultdict
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET

NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
}

REL_NS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def column_to_index(cell_ref: str) -> int:
    letters = "".join(ch for ch in cell_ref if ch.isalpha())
    index = 0
    for letter in letters:
        index = index * 26 + (ord(letter.upper()) - 64)
    return index - 1


def parse_rows(xlsx_path: Path) -> tuple[list[list[str]], int]:
    with ZipFile(xlsx_path) as archive:
        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in root.findall("main:si", NS):
                shared_strings.append(
                    "".join(node.text or "" for node in item.iterfind(".//main:t", NS))
                )

        workbook = ET.fromstring(archive.read("xl/workbook.xml"))
        rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}
        first_sheet = workbook.find("main:sheets", NS)[0]
        sheet_path = "xl/" + rel_map[first_sheet.attrib[f"{REL_NS}id"]]
        sheet = ET.fromstring(archive.read(sheet_path))

        rows: list[list[str]] = []
        skipped = 0
        for row in sheet.findall(".//main:sheetData/main:row", NS):
            values: dict[int, str] = {}
            for cell in row.findall("main:c", NS):
                ref = cell.attrib.get("r", "")
                index = column_to_index(ref) if ref else len(values)
                cell_type = cell.attrib.get("t")
                value_node = cell.find("main:v", NS)
                value = "" if value_node is None else (value_node.text or "")
                if cell_type == "s" and value:
                    value = shared_strings[int(value)]
                values[index] = value

            if not values:
                continue

            width = max(values) + 1
            padded = [values.get(i, "") for i in range(width)]
            if len(padded) < 11:
                skipped += 1
                continue
            rows.append(padded[:11])

    return rows, skipped


def build_program_data(rows: list[list[str]], skipped: int) -> dict:
    headers = rows[0]
    data_rows = [dict(zip(headers, row)) for row in rows[1:]]

    program_code = data_rows[0]["PROGRAM CODE"]
    program_title = data_rows[0]["PROGRAM TITLE"]

    courses: dict[str, dict] = {}
    skills: dict[str, dict] = {}
    categories: dict[str, dict] = {}
    competency_index: dict[tuple[str, str], dict] = {}
    mapping_counter = Counter()

    for row in data_rows:
        course_code = row["COURSE CODE"].split("-")[0]
        course_title = row["COURSE TITLE"]
        competency_number = row["COMPETENCY NUMBER"]
        competency_name = row["COMPETENCY NAME"]
        competency_statement = row["COMPETENCY STATEMENT"]
        category_name = row["RSD CATEGORY"]
        skill_name = row["RSD NAME"]
        skill_statement = row["RSD STATEMENT"]
        skill_uri = row["RSD URI"]

        mapping_counter["total"] += 1

        course = courses.setdefault(
            course_code,
            {
                "code": course_code,
                "title": course_title,
                "skillNames": set(),
                "categoryNames": set(),
                "competencies": {},
            },
        )
        course["skillNames"].add(skill_name)
        course["categoryNames"].add(category_name)

        competency_key = (course_code, competency_number)
        competency = competency_index.setdefault(
            competency_key,
            {
                "number": competency_number,
                "name": competency_name,
                "statement": competency_statement,
                "skillNames": set(),
                "categoryNames": set(),
                "mappingCount": 0,
            },
        )
        competency["skillNames"].add(skill_name)
        competency["categoryNames"].add(category_name)
        competency["mappingCount"] += 1
        course["competencies"][competency_number] = competency

        skill = skills.setdefault(
            skill_name,
            {
                "name": skill_name,
                "statement": skill_statement,
                "uri": skill_uri,
                "categories": set(),
                "courseCodes": set(),
                "courseTitles": set(),
                "competencyNumbers": set(),
                "competencyNames": set(),
                "mappingCount": 0,
            },
        )
        skill["categories"].add(category_name)
        skill["courseCodes"].add(course_code)
        skill["courseTitles"].add(course_title)
        skill["competencyNumbers"].add(competency_number)
        skill["competencyNames"].add(competency_name)
        skill["mappingCount"] += 1

        category = categories.setdefault(
            category_name,
            {
                "name": category_name,
                "skillNames": set(),
                "courseCodes": set(),
                "mappingCount": 0,
            },
        )
        category["skillNames"].add(skill_name)
        category["courseCodes"].add(course_code)
        category["mappingCount"] += 1

    course_list = []
    for course in sorted(courses.values(), key=lambda item: item["code"]):
        competencies = []
        for competency in sorted(
            course["competencies"].values(), key=lambda item: item["number"]
        ):
            competencies.append(
                {
                    "number": competency["number"],
                    "name": competency["name"],
                    "statement": competency["statement"],
                    "mappingCount": competency["mappingCount"],
                    "skillCount": len(competency["skillNames"]),
                    "categoryNames": sorted(competency["categoryNames"]),
                }
            )

        course_list.append(
            {
                "code": course["code"],
                "title": course["title"],
                "skillCount": len(course["skillNames"]),
                "categoryCount": len(course["categoryNames"]),
                "competencyCount": len(competencies),
                "categoryNames": sorted(course["categoryNames"]),
                "competencies": competencies,
            }
        )

    skill_list = []
    for skill in sorted(
        skills.values(), key=lambda item: (-item["mappingCount"], item["name"])
    ):
        skill_list.append(
            {
                "name": skill["name"],
                "statement": skill["statement"],
                "uri": skill["uri"],
                "mappingCount": skill["mappingCount"],
                "courseCount": len(skill["courseCodes"]),
                "categories": sorted(skill["categories"]),
                "courseCodes": sorted(skill["courseCodes"]),
                "courseTitles": sorted(skill["courseTitles"]),
                "competencyNumbers": sorted(skill["competencyNumbers"]),
                "competencyNames": sorted(skill["competencyNames"]),
            }
        )

    category_list = []
    for category in sorted(
        categories.values(), key=lambda item: (-item["mappingCount"], item["name"])
    ):
        category_list.append(
            {
                "name": category["name"],
                "mappingCount": category["mappingCount"],
                "skillCount": len(category["skillNames"]),
                "courseCount": len(category["courseCodes"]),
                "skillNames": sorted(category["skillNames"]),
                "courseCodes": sorted(category["courseCodes"]),
            }
        )

    return {
        "summary": {
            "programCode": program_code,
            "programTitle": program_title,
            "mappingCount": mapping_counter["total"],
            "skippedRows": skipped,
            "courseCount": len(course_list),
            "competencyCount": len(competency_index),
            "skillCount": len(skill_list),
            "categoryCount": len(category_list),
        },
        "courses": course_list,
        "skills": skill_list,
        "categories": category_list,
    }


def main() -> int:
    if len(sys.argv) not in (3, 4):
        print(
            "Usage: generate_program_data.py <input.xlsx> <output.json> [output.js]",
            file=sys.stderr,
        )
        return 1

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    js_output_path = Path(sys.argv[3]) if len(sys.argv) == 4 else None

    rows, skipped = parse_rows(input_path)
    data = build_program_data(rows, skipped)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    json_payload = json.dumps(data, indent=2)
    output_path.write_text(json_payload)
    if js_output_path is not None:
        js_output_path.parent.mkdir(parents=True, exist_ok=True)
        js_output_path.write_text(f"window.PROGRAM_DATA = {json_payload};\n")
    print(
        f"Wrote {data['summary']['courseCount']} courses and "
        f"{data['summary']['skillCount']} skills to {output_path}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
