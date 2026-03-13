(function () {
  const programData = window.PROGRAM_DATA;

  const PROGRAM_COURSES = [
    { code: "C715", title: "Organizational Behavior", term: 1, type: "bus-mgmt" },
    { code: "D268", title: "Introduction to Communication: Connecting with Others", term: 1, type: "gen-ed" },
    { code: "D640", title: "Giving, Receiving and Incorporating Feedback", term: 1, type: "power" },
    { code: "D082", title: "Emotional and Cultural Intelligence", term: 1, type: "bus-core" },
    { code: "D081", title: "Innovative and Strategic Thinking", term: 2, type: "bus-core" },
    { code: "D651", title: "Foundations of Design", term: 2, type: "design" },
    { code: "D265", title: "Critical Thinking: Reason and Evidence", term: 2, type: "gen-ed" },
    { code: "D641", title: "Adapting to Ambiguity", term: 2, type: "power" },
    { code: "D653", title: "Empathizing, Defining, and Ideating", term: 3, type: "design" },
    { code: "C483", title: "Principles of Management", term: 3, type: "bus-core" },
    { code: "D642", title: "Empathy and Inclusive Collaboration", term: 3, type: "power" },
    { code: "D078", title: "Business Environment Applications I: Business Structures and Legal Environment", term: 3, type: "bus-core" },
    { code: "D388", title: "Fundamentals of Spreadsheets and Data Presentations", term: 4, type: "bus-core" },
    { code: "D774", title: "Introduction to Business Accounting", term: 4, type: "bus-core" },
    { code: "D269", title: "Composition: Writing with a Strategy", term: 4, type: "gen-ed" },
    { code: "D643", title: "Navigating Complex Problems", term: 4, type: "power" },
    { code: "D459", title: "Introduction to Systems Thinking and Applications", term: 5, type: "gen-ed" },
    { code: "D775", title: "Introduction to Business Finance", term: 5, type: "bus-core" },
    { code: "D246", title: "Influential Communication through Visual Design and Storytelling", term: 5, type: "gen-ed" },
    { code: "D652", title: "Design Applications", term: 5, type: "design" },
    { code: "D079", title: "Business Environment Applications II: Process, Logistics, and Operations", term: 6, type: "bus-core" },
    { code: "C458", title: "Health, Fitness, and Wellness", term: 6, type: "gen-ed" },
    { code: "C722", title: "Project Management", term: 6, type: "bus-mgmt" },
    { code: "C721", title: "Change Management", term: 6, type: "bus-mgmt" },
    { code: "C273", title: "Introduction to Sociology", term: 7, type: "gen-ed" },
    { code: "D077", title: "Concepts in Marketing, Sales, and Customer Contact", term: 7, type: "bus-core" },
    { code: "C165", title: "Integrated Physical Sciences", term: 7, type: "gen-ed" },
    { code: "D654", title: "Prototyping and Iterating I", term: 7, type: "design" },
    { code: "D655", title: "Prototyping and Iterating II", term: 8, type: "design" },
    { code: "C955", title: "Applied Probability and Statistics", term: 8, type: "gen-ed" },
    { code: "D266", title: "World History: Diverse Cultures and Global Connections", term: 8, type: "gen-ed" },
    { code: "D089", title: "Principles of Economics", term: 8, type: "bus-core" },
    { code: "D351", title: "Functions of Human Resource Management", term: 9, type: "hr" },
    { code: "D656", title: "Leveraging AI and Technology in Design", term: 9, type: "design" },
    { code: "D080", title: "Managing in a Global Business Environment", term: 9, type: "bus-core" },
    { code: "D361", title: "Business Simulation", term: 9, type: "bus-core" },
    { code: "D253", title: "Values-Based Leadership", term: 10, type: "bus-mgmt" },
    { code: "D657", title: "Design Applied Learning Capstone", term: 10, type: "design" },
  ];

  const DOMAIN_SCORES = [
    { name: "Design Core", score: 86, color: "linear-gradient(90deg, #ff9a62, #ff7a3d)" },
    { name: "Research and Insights", score: 82, color: "linear-gradient(90deg, #72c6ff, #3ea7ff)" },
    { name: "Communication", score: 79, color: "linear-gradient(90deg, #69ddb0, #37c78e)" },
    { name: "Collaboration and Leadership", score: 75, color: "linear-gradient(90deg, #c09cff, #9f7aea)" },
    { name: "Problem Solving", score: 84, color: "linear-gradient(90deg, #ffc979, #ffb84d)" },
    { name: "Professional Growth", score: 72, color: "linear-gradient(90deg, #ff93a0, #ff6f7d)" },
    { name: "Technology and AI", score: 77, color: "linear-gradient(90deg, #7be6ff, #34c8dd)" },
  ];

  const EVIDENCE_DISTRIBUTION = [
    { name: "Assessments", value: 44, color: "linear-gradient(90deg, #ff9a62, #ff7a3d)" },
    { name: "Work Products", value: 26, color: "linear-gradient(90deg, #72c6ff, #3ea7ff)" },
    { name: "Credentials", value: 7, color: "linear-gradient(90deg, #69ddb0, #37c78e)" },
    { name: "Self Attested", value: 18, color: "linear-gradient(90deg, #c09cff, #9f7aea)" },
  ];

  const TYPE_LABELS = {
    "bus-mgmt": "Business Management",
    "gen-ed": "General Education",
    power: "Power Skills",
    "bus-core": "Business Core",
    design: "Design",
    hr: "Human Resources",
  };

  const TYPE_COLORS = {
    "bus-mgmt": "#9f7aea",
    "gen-ed": "#708090",
    power: "#ffb84d",
    "bus-core": "#3ea7ff",
    design: "#ff7a3d",
    hr: "#37c78e",
  };

  const sourceByCode = Object.fromEntries(programData.courses.map((course) => [course.code, course]));
  const completedCount = 28;
  const inProgressCount = 2;
  const overallEQ = Math.round(DOMAIN_SCORES.reduce((sum, item) => sum + item.score, 0) / DOMAIN_SCORES.length);
  const topCategories = programData.categories.slice(0, 6);
  const denseCourses = programData.courses.slice().sort((a, b) => b.skillCount - a.skillCount).slice(0, 6);

  const coursesWithStatus = PROGRAM_COURSES.map((course, index) => {
    let status = "Pending";
    if (index < completedCount) status = "Completed";
    else if (index < completedCount + inProgressCount) status = "In Progress";
    return Object.assign({}, course, sourceByCode[course.code] || {}, { status: status });
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function statCard(label, value, sub, color) {
    return `
      <article class="card stat-card">
        <div class="stat-label">${escapeHtml(label)}</div>
        <div class="stat-value" style="color:${color}">${escapeHtml(value)}</div>
        <div class="stat-sub">${escapeHtml(sub)}</div>
      </article>
    `;
  }

  function barList(items, maxValue) {
    return `
      <div class="bar-list">
        ${items
          .map((item) => `
            <div class="bar-row">
              <div class="bar-head">
                <span class="bar-label">${escapeHtml(item.name)}</span>
                <span class="bar-value">${escapeHtml(item.score || item.value || item.mappingCount)}</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width:${Math.max(8, Math.round(((item.score || item.value || item.mappingCount) / maxValue) * 100))}%;background:${item.color || "linear-gradient(90deg,#ff9a62,#ff7a3d)"}"></div>
              </div>
            </div>
          `)
          .join("")}
      </div>
    `;
  }

  function renderTimeline() {
    const terms = Array.from(new Set(coursesWithStatus.map((course) => course.term)));
    return terms
      .map((term) => {
        const termCourses = coursesWithStatus.filter((course) => course.term === term);
        return `
          <div class="term-block">
            <div class="term-label">Term ${term}</div>
            ${termCourses
              .map((course) => `
                <div class="course-item" style="border-left-color:${TYPE_COLORS[course.type]}">
                  <div>
                    <strong>${escapeHtml(course.title)}</strong>
                    <div class="course-meta">
                      <span class="chip">${escapeHtml(course.code)}</span>
                      <span class="chip">${escapeHtml(TYPE_LABELS[course.type])}</span>
                      <span class="chip">${escapeHtml(course.skillCount || 0)} mapped skills</span>
                      <span class="chip">${escapeHtml(course.competencyCount || 0)} competencies</span>
                    </div>
                  </div>
                  <div class="course-status ${course.status === "Completed" ? "status-completed" : course.status === "In Progress" ? "status-progress" : "status-pending"}">${escapeHtml(course.status)}</div>
                </div>
              `)
              .join("")}
          </div>
        `;
      })
      .join("");
  }

  const typeSummary = Object.keys(TYPE_LABELS).map((type) => ({
    name: TYPE_LABELS[type],
    count: coursesWithStatus.filter((course) => course.type === type).length,
    color: TYPE_COLORS[type],
  }));

  document.getElementById("root").innerHTML = `
    <div class="dashboard-shell">
      <section class="hero">
        <div>
          <div class="eyebrow"><span class="eyebrow-dot"></span> Static GitHub Pages Dashboard</div>
          <h1>${escapeHtml(programData.summary.programTitle)}</h1>
          <p>
            Spreadsheet-backed Skills EQ prototype rebuilt to run directly on GitHub Pages with no API keys,
            no build step, and no third-party runtime dependency. The dashboard below uses the attached
            workbook and PDF committed with the repository.
          </p>
          <div class="hero-meta">
            <span class="meta-pill">${escapeHtml(programData.summary.programCode)}</span>
            <span class="meta-pill">${escapeHtml(programData.summary.courseCount)} courses</span>
            <span class="meta-pill">${escapeHtml(programData.summary.competencyCount)} competencies</span>
            <span class="meta-pill">${escapeHtml(programData.summary.mappingCount)} rich-skill mappings</span>
          </div>
        </div>
        <div class="gauge-card">
          <div class="gauge" style="--pct:${overallEQ / 100}turn">
            <strong>${overallEQ}</strong>
          </div>
          <span>Composite Skills EQ</span>
        </div>
      </section>

      <section class="stats-grid">
        ${statCard("Program Completion", "74%", "28 of 38 courses completed in this prototype view", "var(--green)")}
        ${statCard("Distinct Skills", programData.summary.skillCount, "Indexed from the attached spreadsheet", "var(--accent)")}
        ${statCard("Competencies", programData.summary.competencyCount, "Workbook competencies mapped to rich skills", "var(--blue)")}
        ${statCard("Tracked Domains", DOMAIN_SCORES.length, "High-level dashboard domains", "var(--gold)")}
      </section>

      <section class="section-grid">
        <article class="card">
          <div class="card-title">
            <h2>Domain Scores</h2>
            <span class="chip">Prototype proficiency view</span>
          </div>
          ${barList(DOMAIN_SCORES, 100)}
        </article>

        <article class="card">
          <div class="card-title">
            <h2>Evidence Distribution</h2>
            <span class="chip">Weighted evidence model</span>
          </div>
          ${barList(EVIDENCE_DISTRIBUTION, 50)}
        </article>

        <article class="card">
          <div class="card-title">
            <h2>Local Source Bundle</h2>
            <span class="chip">Repo committed assets</span>
          </div>
          <p class="card-note">
            The page reads from local repository files only. The workbook is also exported as a browser-safe
            JavaScript data bundle so GitHub Pages does not need a preprocessing step.
          </p>
          <div class="split-grid two" style="margin-top:18px">
            <div class="mini-panel">
              <strong>${escapeHtml(programData.summary.mappingCount)}</strong>
              <span>Total workbook mappings</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(programData.summary.skippedRows)}</strong>
              <span>Course-planning rows omitted from the skill map</span>
            </div>
          </div>
          <div class="source-links">
            <a class="source-link" href="./public/assets/course-skills.xlsx" target="_blank" rel="noreferrer">
              <div>
                <strong>Course Skills Workbook</strong>
                <span>${escapeHtml(programData.summary.courseCount)} courses and ${escapeHtml(programData.summary.skillCount)} distinct skills</span>
              </div>
              <span class="chip">Open file</span>
            </a>
            <a class="source-link" href="./public/assets/document-reference.pdf" target="_blank" rel="noreferrer">
              <div>
                <strong>Reference PDF</strong>
                <span>Attached design/source document bundled with the repo</span>
              </div>
              <span class="chip">Open file</span>
            </a>
          </div>
        </article>

        <article class="card">
          <div class="card-title">
            <h2>Top Program Categories</h2>
            <span class="chip">Highest workbook coverage</span>
          </div>
          <div class="rank-list">
            ${topCategories
              .map((category) => `
                <div class="rank-item">
                  <span class="rank-pill">${escapeHtml(category.mappingCount)}</span>
                  <div>
                    <strong>${escapeHtml(category.name)}</strong>
                    <div class="card-note">${escapeHtml(category.skillCount)} skills across ${escapeHtml(category.courseCount)} courses</div>
                  </div>
                  <span class="chip">${escapeHtml(category.courseCodes.slice(0, 2).join(", "))}</span>
                </div>
              `)
              .join("")}
          </div>
        </article>
      </section>

      <section class="section-grid">
        <article class="card">
          <div class="card-title">
            <h2>Course Timeline</h2>
            <span class="chip">Program path overview</span>
          </div>
          <div class="timeline">
            ${renderTimeline()}
          </div>
        </article>

        <article class="card">
          <div class="card-title">
            <h2>Most Dense Courses</h2>
            <span class="chip">Largest mapped skill footprint</span>
          </div>
          <div class="rank-list">
            ${denseCourses
              .map((course) => `
                <div class="rank-item">
                  <span class="rank-pill">${escapeHtml(course.code)}</span>
                  <div>
                    <strong>${escapeHtml(course.title)}</strong>
                    <div class="card-note">${escapeHtml(course.skillCount)} mapped skills and ${escapeHtml(course.competencyCount)} competencies</div>
                  </div>
                  <span class="chip">${escapeHtml(course.categoryNames.slice(0, 2).join(", "))}</span>
                </div>
              `)
              .join("")}
          </div>

          <div class="split-grid two" style="margin-top:18px">
            ${typeSummary
              .map((item) => `
                <div class="mini-panel">
                  <strong style="color:${item.color}">${escapeHtml(item.count)}</strong>
                  <span>${escapeHtml(item.name)}</span>
                </div>
              `)
              .join("")}
          </div>
        </article>
      </section>

      <section class="section-banner">
        <h2 style="margin:0;font-size:18px">Methodology</h2>
        <p>
          Assessment evidence carries the most weight, followed by work products, credentials, and self-attested skills.
          This live GitHub Pages version is intentionally static-first: the source workbook is transformed into committed
          browser-readable data, which avoids API keys, live service dependencies, and build-time failures.
        </p>
      </section>
    </div>
  `;
})();
