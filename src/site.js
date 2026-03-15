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
    "gen-ed": "#74839a",
    power: "#f6b35c",
    "bus-core": "#39a8eb",
    design: "#f26a3d",
    hr: "#35c77f",
  };

  const DOMAIN_SCORES = [
    { id: "design", name: "Design Core", shortName: "Design Core", score: 86, color: "#f26a3d", fill: "linear-gradient(90deg, #f08b61, #f26a3d)" },
    { id: "research", name: "Research & Insights", shortName: "Research & Insights", score: 82, color: "#3da6ed", fill: "linear-gradient(90deg, #71c6ff, #3da6ed)" },
    { id: "communication", name: "Communication", shortName: "Communication", score: 79, color: "#38c082", fill: "linear-gradient(90deg, #71ddb0, #38c082)" },
    { id: "collaboration", name: "Collaboration & Leadership", shortName: "Collaboration & Leadership", score: 75, color: "#965ee5", fill: "linear-gradient(90deg, #be9cff, #965ee5)" },
    { id: "problem", name: "Problem Solving", shortName: "Problem Solving", score: 84, color: "#f3b14f", fill: "linear-gradient(90deg, #ffd07e, #f3b14f)" },
    { id: "professional", name: "Professional Growth", shortName: "Professional Growth", score: 72, color: "#ff6f7d", fill: "linear-gradient(90deg, #ff9aa4, #ff6f7d)" },
    { id: "tech", name: "Technology & AI", shortName: "Technology & AI", score: 77, color: "#24c4d8", fill: "linear-gradient(90deg, #7ce8ff, #24c4d8)" },
  ];

  const DOMAIN_BLUEPRINT = {
    design: {
      summary: "The program is most mature in applied UX design, design thinking, and prototyping practice.",
      rationale: "This domain is reinforced repeatedly across the design sequence and culminates in capstone-level application.",
      categories: ["User Experience (UX) Design", "User-Centered Design", "Design Thinking", "Visual Design", "Prototyping"],
    },
    research: {
      summary: "Research capability is supported by inquiry, evidence, customer insight, and market-facing analysis.",
      rationale: "Research shows up in both design-centered courses and general analytical coursework, giving it broad coverage.",
      categories: ["Research", "User Research", "Market Research", "Customer Insights", "Data Analysis"],
    },
    communication: {
      summary: "Communication strength comes from writing, presentation, storytelling, and visual narrative requirements.",
      rationale: "Several courses require persuasive communication, structured writing, and visual explanation of ideas.",
      categories: ["Communication", "Professional Communication", "Written Communication", "Presentations", "Storytelling", "Digital Storytelling"],
    },
    collaboration: {
      summary: "Leadership and collaboration are embedded through empathy, team practice, and change-oriented business work.",
      rationale: "This area is distributed across interpersonal, management, and organizational behavior coursework.",
      categories: ["Collaboration", "Leadership", "Team Leadership", "Teamwork", "Relationship Building", "Conflict Resolution"],
    },
    problem: {
      summary: "Problem solving is consistently visible through critical thinking, systems framing, and analytical decision-making.",
      rationale: "The curriculum builds problem solving through evidence-based reasoning and increasingly complex design tasks.",
      categories: ["Problem Solving", "Critical Thinking", "Systems Thinking", "Creative Problem-Solving", "Analytical Thinking", "Decision Making"],
    },
    professional: {
      summary: "Professional growth is present, but much of its strongest evidence depends on reflection, leadership, and capstone packaging.",
      rationale: "This domain improves when students make implicit growth signals more explicit in artifacts and reflection.",
      categories: ["Career Development", "Professional Development", "Self-Reflection", "Goal Setting", "Adaptability", "Emotional Intelligence"],
    },
    tech: {
      summary: "Technology and AI appear meaningfully in the program, but the clearest visible lift arrives in later-term coursework.",
      rationale: "The strongest source evidence comes from design technology, AI use, and related technical tooling categories.",
      categories: ["Artificial Intelligence (AI)", "Technology Ethics", "Design Tool", "Computer-Aided Design", "Data Visualization", "Data Management"],
    },
  };

  const EVIDENCE_DISTRIBUTION = [
    { id: "assessment", name: "Assessment", value: 44, color: "#f26a3d", fill: "linear-gradient(90deg, #f08b61, #f26a3d)" },
    { id: "work-product", name: "Work Product", value: 26, color: "#3da6ed", fill: "linear-gradient(90deg, #71c6ff, #3da6ed)" },
    { id: "credential", name: "Credential", value: 7, color: "#38c082", fill: "linear-gradient(90deg, #71ddb0, #38c082)" },
    { id: "self-attested", name: "Self Attested", value: 18, color: "#965ee5", fill: "linear-gradient(90deg, #be9cff, #965ee5)" },
  ];

  const WEIGHTING_MODEL = [
    { name: "Assessment", weight: "46%", note: "Most defensible source because skill claims are evaluated in structured course contexts." },
    { name: "Work Product", weight: "27%", note: "Strongest portfolio-facing signal because it produces visible artifacts and evidence." },
    { name: "Credential", weight: "7%", note: "Useful when present, but relatively rare in the current workbook-derived dataset." },
    { name: "Self Attested", weight: "20%", note: "Helpful for breadth, but intentionally weighted below assessed and artifact-backed evidence." },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "domains", label: "Skill Domains" },
    { id: "evidence", label: "Evidence & Rationale" },
    { id: "recommendations", label: "Recommendations" },
    { id: "progress", label: "Program Progress" },
    { id: "methodology", label: "Methodology" },
  ];

  const sourceByCode = Object.fromEntries(programData.courses.map(function (course) {
    return [course.code, course];
  }));

  const skills = programData.skills.slice().sort(function (a, b) {
    return b.mappingCount - a.mappingCount || a.name.localeCompare(b.name);
  });

  const categories = programData.categories.slice().sort(function (a, b) {
    return b.mappingCount - a.mappingCount || a.name.localeCompare(b.name);
  });

  const courseLibrary = PROGRAM_COURSES.map(function (course, index) {
    let status = "Pending";
    if (index < 28) status = "Completed";
    else if (index < 30) status = "In Progress";
    return Object.assign({}, course, sourceByCode[course.code] || {}, { status: status });
  });

  const domainRecords = DOMAIN_SCORES.map(function (score) {
    const blueprint = DOMAIN_BLUEPRINT[score.id];
    const categoryRecords = blueprint.categories.map(function (name) {
      return categories.find(function (category) {
        return category.name === name;
      });
    }).filter(Boolean);

    const courseRecords = courseLibrary.filter(function (course) {
      return (course.categoryNames || []).some(function (name) {
        return blueprint.categories.indexOf(name) >= 0;
      });
    }).sort(function (a, b) {
      return a.term - b.term || a.code.localeCompare(b.code);
    });

    const skillRecords = skills.filter(function (skill) {
      return skill.categories.some(function (name) {
        return blueprint.categories.indexOf(name) >= 0;
      });
    }).sort(function (a, b) {
      return b.mappingCount - a.mappingCount || a.name.localeCompare(b.name);
    });

    const evidencePoints = Math.round(skillRecords.slice(0, 10).reduce(function (sum, skill) {
      return sum + Math.min(skill.mappingCount, 10);
    }, 0) / 2);

    return Object.assign({}, score, blueprint, {
      categoryRecords: categoryRecords,
      courseRecords: courseRecords,
      skillRecords: skillRecords,
      evidencePoints: evidencePoints,
      nextCourses: courseRecords.filter(function (course) {
        return course.status !== "Completed";
      }).slice(0, 3),
    });
  });

  const state = {
    activeTab: "overview",
    selectedDomain: domainRecords[0] ? domainRecords[0].id : "",
    selectedSkill: skills[0] ? skills[0].name : "",
    selectedCourse: courseLibrary[0] ? courseLibrary[0].code : "",
    skillQuery: "",
    timelineQuery: "",
    timelineStatus: "all",
    timelineType: "all",
  };

  const root = document.getElementById("root");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function selectedDomainRecord() {
    return domainRecords.find(function (domain) {
      return domain.id === state.selectedDomain;
    }) || domainRecords[0];
  }

  function selectedSkillRecord() {
    return skills.find(function (skill) {
      return skill.name === state.selectedSkill;
    }) || skills[0];
  }

  function selectedCourseRecord() {
    return courseLibrary.find(function (course) {
      return course.code === state.selectedCourse;
    }) || courseLibrary[0];
  }

  function totalTerms() {
    return Math.max.apply(null, courseLibrary.map(function (course) {
      return course.term;
    }));
  }

  function currentTerm() {
    return Math.max.apply(null, courseLibrary.filter(function (course) {
      return course.status !== "Pending";
    }).map(function (course) {
      return course.term;
    }));
  }

  function completedCourseCount() {
    return courseLibrary.filter(function (course) {
      return course.status === "Completed";
    }).length;
  }

  function inProgressCourseCount() {
    return courseLibrary.filter(function (course) {
      return course.status === "In Progress";
    }).length;
  }

  function pendingCourseCount() {
    return courseLibrary.filter(function (course) {
      return course.status === "Pending";
    }).length;
  }

  function programCompletionPct() {
    return Math.round((completedCourseCount() / courseLibrary.length) * 100);
  }

  function overallEQ() {
    return Math.round(DOMAIN_SCORES.reduce(function (sum, item) {
      return sum + item.score;
    }, 0) / DOMAIN_SCORES.length);
  }

  function evidencePointTotal() {
    return Math.round(programData.summary.mappingCount / 15);
  }

  function trackedSkillCount() {
    return skills.filter(function (skill) {
      return skill.mappingCount >= 6;
    }).length;
  }

  function shortProgramTitle() {
    return programData.summary.programTitle.replace("Bachelor of Science, ", "B.S. ");
  }

  function catalogCode() {
    const parts = String(programData.summary.programCode || "").split("-");
    return parts[1] || parts[0] || "";
  }

  function skillDomainsForSkill(skill) {
    return domainRecords.filter(function (domain) {
      return skill.categories.some(function (name) {
        return domain.categories.indexOf(name) >= 0;
      });
    });
  }

  function growthSeries() {
    const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
    return labels.map(function (label, index) {
      const completedByTerm = courseLibrary.filter(function (course) {
        return course.term <= index + 1 && course.status !== "Pending";
      }).length;
      return {
        label: label,
        value: Math.round((completedByTerm / courseLibrary.length) * 100),
      };
    });
  }

  function renderMetricCard(label, value, sub, tone) {
    return `
      <article class="metric-card">
        <div class="metric-label">${escapeHtml(label)}</div>
        <div class="metric-value metric-${escapeHtml(tone)}">${escapeHtml(value)}</div>
        <div class="metric-sub">${escapeHtml(sub)}</div>
      </article>
    `;
  }

  function renderTagList(values, actionName, limit, className) {
    return values
      .slice(0, limit || values.length)
      .map(function (value) {
        if (!actionName) {
          return `<span class="tag ${className || ""}">${escapeHtml(value)}</span>`;
        }
        return `<button class="tag tag-button ${className || ""}" data-select-${actionName}="${escapeHtml(value)}">${escapeHtml(value)}</button>`;
      })
      .join("");
  }

  function renderSemiGauge(value) {
    return `
      <div class="gauge-panel">
        <svg class="gauge-svg" viewBox="0 0 140 88" aria-hidden="true">
          <path pathLength="100" class="gauge-track" d="M 18 70 A 52 52 0 0 1 122 70"></path>
          <path pathLength="100" class="gauge-progress" style="stroke-dasharray:${escapeHtml(value)} 100" d="M 18 70 A 52 52 0 0 1 122 70"></path>
        </svg>
        <div class="gauge-reading">
          <strong>${escapeHtml(value)}</strong>
          <span>SKILL EQ</span>
        </div>
      </div>
    `;
  }

  function renderBars(items, maxValue, actionName) {
    return `
      <div class="bar-stack">
        ${items
          .map(function (item) {
            const value = item.score || item.value || item.mappingCount || 0;
            const width = Math.max(8, Math.round((value / maxValue) * 100));
            const tag = actionName ? "button" : "div";
            const attr = actionName ? `data-select-${actionName}="${escapeHtml(item[actionName])}"` : "";
            return `
              <${tag} class="bar-row ${actionName ? "bar-row-action" : ""}" ${attr}>
                <div class="bar-head">
                  <span class="bar-label">${escapeHtml(item.name)}</span>
                  <span class="bar-value" style="color:${item.color || "#f4f1eb"}">${escapeHtml(value)}</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width:${width}%;background:${item.fill || item.color || "#f26a3d"}"></div>
                </div>
              </${tag}>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderRadar(items) {
    const width = 460;
    const height = 320;
    const cx = 230;
    const cy = 148;
    const radius = 94;
    const levels = 4;

    function wrapLabel(label) {
      const words = label.split(" ");
      const lines = [];
      let current = "";

      words.forEach(function (word) {
        const next = current ? current + " " + word : word;
        if (next.length <= 17 || !current) current = next;
        else {
          lines.push(current);
          current = word;
        }
      });

      if (current) lines.push(current);
      return lines.slice(0, 3);
    }

    function point(index, scale) {
      const angle = (-Math.PI / 2) + ((Math.PI * 2) / items.length) * index;
      const r = radius * scale;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      };
    }

    const grid = Array.from({ length: levels }, function (_, levelIndex) {
      const scale = (levelIndex + 1) / levels;
      const points = items.map(function (_, itemIndex) {
        const p = point(itemIndex, scale);
        return p.x.toFixed(1) + "," + p.y.toFixed(1);
      }).join(" ");
      return `<polygon class="radar-grid" points="${points}"></polygon>`;
    }).join("");

    const axes = items.map(function (_, index) {
      const p = point(index, 1);
      return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}"></line>`;
    }).join("");

    const valuePoints = items.map(function (item, index) {
      const p = point(index, item.score / 100);
      return p.x.toFixed(1) + "," + p.y.toFixed(1);
    }).join(" ");

    const closedPoint = point(0, items[0].score / 100);
    const closedValuePoints = valuePoints + " " + closedPoint.x.toFixed(1) + "," + closedPoint.y.toFixed(1);

    const dots = items.map(function (item, index) {
      const dotPoint = point(index, item.score / 100);
      const labelPoint = point(index, 1.12);
      const anchor = labelPoint.x < cx - 24 ? "end" : labelPoint.x > cx + 24 ? "start" : "middle";
      const lines = wrapLabel(item.shortName || item.name);
      const startY = labelPoint.y - ((lines.length - 1) * 6);
      return `
        <g class="radar-hotspot" data-select-domain="${escapeHtml(item.id)}">
          <circle class="radar-hit" cx="${dotPoint.x.toFixed(1)}" cy="${dotPoint.y.toFixed(1)}" r="18"></circle>
          <circle class="radar-dot" cx="${dotPoint.x.toFixed(1)}" cy="${dotPoint.y.toFixed(1)}" r="4.5"></circle>
          <text class="radar-label" x="${labelPoint.x.toFixed(1)}" y="${startY.toFixed(1)}" text-anchor="${anchor}">
            ${lines.map(function (line, lineIndex) {
              return `<tspan x="${labelPoint.x.toFixed(1)}" dy="${lineIndex === 0 ? 0 : 12}">${escapeHtml(line)}</tspan>`;
            }).join("")}
          </text>
        </g>
      `;
    }).join("");

    const ticks = [25, 50, 75, 100].map(function (tick, index) {
      const y = cy - (radius * ((index + 1) / levels)) + 4;
      return `<text class="radar-tick" x="${cx + 8}" y="${y.toFixed(1)}">${tick}</text>`;
    }).join("");

    return `
      <div class="radar-wrap">
        <svg class="radar-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Skill domain profile">
          ${grid}
          ${axes}
          <polygon class="radar-fill" points="${valuePoints}"></polygon>
          <polyline class="radar-line" points="${closedValuePoints}"></polyline>
          ${dots}
          ${ticks}
        </svg>
      </div>
    `;
  }

  function renderLineChart(points) {
    const width = 520;
    const height = 284;
    const left = 50;
    const right = 18;
    const top = 20;
    const bottom = 42;
    const innerWidth = width - left - right;
    const innerHeight = height - top - bottom;

    const coords = points.map(function (point, index) {
      return {
        label: point.label,
        value: point.value,
        x: left + ((innerWidth / (points.length - 1)) * index),
        y: top + ((100 - point.value) / 100) * innerHeight,
      };
    });

    const linePath = coords.map(function (point, index) {
      return (index === 0 ? "M " : " L ") + point.x.toFixed(1) + " " + point.y.toFixed(1);
    }).join("");

    const areaPath = linePath +
      " L " + coords[coords.length - 1].x.toFixed(1) + " " + (height - bottom).toFixed(1) +
      " L " + coords[0].x.toFixed(1) + " " + (height - bottom).toFixed(1) + " Z";

    return `
      <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Skill EQ growth trend">
        <defs>
          <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(242, 106, 61, 0.36)"></stop>
            <stop offset="100%" stop-color="rgba(242, 106, 61, 0.02)"></stop>
          </linearGradient>
        </defs>
        ${[0, 25, 50, 75, 100].map(function (tick) {
          const y = top + ((100 - tick) / 100) * innerHeight;
          return `
            <g>
              <line class="line-grid" x1="${left}" y1="${y.toFixed(1)}" x2="${(width - right).toFixed(1)}" y2="${y.toFixed(1)}"></line>
              <text class="line-tick" x="${left - 10}" y="${(y + 4).toFixed(1)}">${tick}</text>
            </g>
          `;
        }).join("")}
        <path class="line-area" d="${areaPath}"></path>
        <path class="line-stroke" d="${linePath}"></path>
        ${coords.map(function (point) {
          return `<circle class="line-dot" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3"></circle>`;
        }).join("")}
        ${coords.map(function (point) {
          return `<text class="line-label" x="${point.x.toFixed(1)}" y="${height - 14}">${escapeHtml(point.label)}</text>`;
        }).join("")}
      </svg>
    `;
  }

  function renderHero() {
    return `
      <section class="hero-panel">
        <div class="hero-top">
          <div>
            <div class="eyebrow"><span class="eyebrow-dot"></span>WGU Skill EQ Dashboard</div>
            <h1>${escapeHtml(shortProgramTitle())}</h1>
            <p class="hero-meta-line">
              Hi-Fi Model for FCC Attendees &nbsp;|&nbsp; ${escapeHtml(programData.summary.programCode)} &nbsp;|&nbsp;
              Term ${escapeHtml(currentTerm())} of ${escapeHtml(totalTerms())} &nbsp;|&nbsp; Catalog ${escapeHtml(catalogCode())}
            </p>
          </div>
          ${renderSemiGauge(overallEQ())}
        </div>
        <div class="metric-grid">
          ${renderMetricCard("Program Completion", programCompletionPct() + "%", completedCourseCount() + "/" + courseLibrary.length + " courses", "green")}
          ${renderMetricCard("Evidence Points", evidencePointTotal(), "across high-signal skills", "blue")}
          ${renderMetricCard("Skills Tracked", trackedSkillCount(), DOMAIN_SCORES.length + " domains", "orange")}
          ${renderMetricCard("Avg Confidence", overallEQ() + "%", "weighted composite", "orange")}
        </div>
      </section>
    `;
  }

  function renderTabNav() {
    return `
      <section class="tab-strip">
        <div class="tab-nav">
          ${tabs.map(function (tab) {
            return `
              <button class="tab-button ${tab.id === state.activeTab ? "tab-button-active" : ""}" data-tab="${escapeHtml(tab.id)}">
                <span class="tab-marker"></span>
                <span>${escapeHtml(tab.label)}</span>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderOverview() {
    const growth = growthSeries();
    const rankedDomains = domainRecords.slice().sort(function (a, b) {
      return b.score - a.score;
    }).map(function (domain) {
      return Object.assign({}, domain, { domain: domain.id });
    });

    return `
      <section class="overview-grid">
        <article class="card chart-card">
          <div class="card-head">
            <h2>Skill Domain Profile</h2>
          </div>
          ${renderRadar(domainRecords)}
        </article>
        <article class="card chart-card">
          <div class="card-head">
            <h2>Skill EQ Growth</h2>
          </div>
          ${renderLineChart(growth)}
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Domain Scores</h2>
          </div>
          ${renderBars(rankedDomains, 100, "domain")}
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Evidence Distribution</h2>
          </div>
          ${renderBars(EVIDENCE_DISTRIBUTION, 50)}
        </article>
      </section>
    `;
  }

  function renderDomainSummaryCards(domain) {
    return `
      <div class="mini-grid">
        <div class="mini-panel">
          <strong>${escapeHtml(domain.score)}</strong>
          <span>Domain score</span>
        </div>
        <div class="mini-panel">
          <strong>${escapeHtml(domain.evidencePoints)}</strong>
          <span>Evidence points</span>
        </div>
        <div class="mini-panel">
          <strong>${escapeHtml(domain.categoryRecords.length)}</strong>
          <span>Source categories</span>
        </div>
        <div class="mini-panel">
          <strong>${escapeHtml(domain.courseRecords.length)}</strong>
          <span>Program sources</span>
        </div>
      </div>
    `;
  }

  function renderDomains() {
    const selectedDomain = selectedDomainRecord();

    return `
      <section class="split-layout">
        <article class="card sidebar-card">
          <div class="card-head">
            <h2>Skill Domains</h2>
            <span class="eyebrow-inline">${escapeHtml(domainRecords.length)} tracked</span>
          </div>
          <div class="domain-list">
            ${domainRecords.map(function (domain) {
              return `
                <button class="domain-list-item ${domain.id === selectedDomain.id ? "domain-list-item-active" : ""}" data-select-domain="${escapeHtml(domain.id)}">
                  <div class="domain-list-top">
                    <span class="domain-dot" style="background:${domain.color}"></span>
                    <strong>${escapeHtml(domain.name)}</strong>
                    <span class="domain-score">${escapeHtml(domain.score)}</span>
                  </div>
                  <div class="domain-list-meta">${escapeHtml(domain.categoryRecords.length)} categories · ${escapeHtml(domain.courseRecords.length)} courses</div>
                </button>
              `;
            }).join("")}
          </div>
        </article>
        <article class="card detail-card">
          <div class="card-head">
            <h2>${escapeHtml(selectedDomain.name)}</h2>
            <span class="score-chip" style="color:${selectedDomain.color}">${escapeHtml(selectedDomain.score)}</span>
          </div>
          <p class="detail-copy">${escapeHtml(selectedDomain.summary)}</p>
          ${renderDomainSummaryCards(selectedDomain)}
          <div class="detail-section">
            <h3>Why This Score Makes Sense</h3>
            <p class="detail-copy">${escapeHtml(selectedDomain.rationale)}</p>
          </div>
          <div class="detail-section">
            <h3>Relevant Source Categories</h3>
            <div class="tag-row">
              ${renderTagList(selectedDomain.categoryRecords.map(function (category) { return category.name; }), "", 12)}
            </div>
          </div>
          <div class="detail-section">
            <h3>Priority Skills</h3>
            <div class="detail-list">
              ${selectedDomain.skillRecords.slice(0, 10).map(function (skill) {
                return `
                  <button class="detail-list-button" data-select-skill="${escapeHtml(skill.name)}">
                    <strong>${escapeHtml(skill.mappingCount)}</strong>
                    <span>${escapeHtml(skill.name)}</span>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
          <div class="detail-section">
            <h3>Program Sources</h3>
            <div class="detail-list">
              ${selectedDomain.courseRecords.slice(0, 8).map(function (course) {
                return `
                  <button class="detail-list-button" data-select-course="${escapeHtml(course.code)}">
                    <strong>${escapeHtml(course.code)}</strong>
                    <span>${escapeHtml(course.title)}</span>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </article>
      </section>
    `;
  }

  function filteredEvidenceSkills() {
    const query = state.skillQuery.trim().toLowerCase();
    return skills.filter(function (skill) {
      if (skill.mappingCount < 4) return false;
      if (!query) return true;
      return (
        skill.name.toLowerCase().includes(query) ||
        skill.statement.toLowerCase().includes(query) ||
        skill.categories.some(function (category) { return category.toLowerCase().includes(query); }) ||
        skill.courseCodes.some(function (code) { return code.toLowerCase().includes(query); })
      );
    });
  }

  function renderEvidence() {
    const filteredSkills = filteredEvidenceSkills();
    const skill = selectedSkillRecord();
    const skillDomains = skillDomainsForSkill(skill);

    return `
      <section class="overview-grid">
        <article class="card">
          <div class="card-head">
            <h2>Evidence Distribution</h2>
          </div>
          ${renderBars(EVIDENCE_DISTRIBUTION, 50)}
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Rationale Ladder</h2>
          </div>
          <div class="weight-list">
            ${WEIGHTING_MODEL.map(function (item) {
              return `
                <div class="weight-row">
                  <div class="weight-head">
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${escapeHtml(item.weight)}</span>
                  </div>
                  <p>${escapeHtml(item.note)}</p>
                </div>
              `;
            }).join("")}
          </div>
        </article>
      </section>
      <section class="split-layout">
        <article class="card sidebar-card">
          <div class="card-head">
            <h2>High-Signal Skills</h2>
            <span class="eyebrow-inline">${escapeHtml(filteredSkills.length)} shown</span>
          </div>
          <label class="field-label" for="skill-query">Search skills, categories, or course codes</label>
          <input id="skill-query" class="search-input" type="search" value="${escapeHtml(state.skillQuery)}" data-field="skillQuery" placeholder="Example: communication, D656, research" />
          <div class="scroll-list">
            ${filteredSkills.slice(0, 120).map(function (item) {
              return `
                <button class="list-item ${item.name === skill.name ? "list-item-active" : ""}" data-select-skill="${escapeHtml(item.name)}">
                  <strong>${escapeHtml(item.name)}</strong>
                  <span>${escapeHtml(item.mappingCount)} mappings · ${escapeHtml(item.courseCount)} courses</span>
                </button>
              `;
            }).join("") || '<div class="empty-state">No skills match the current search.</div>'}
          </div>
        </article>
        <article class="card detail-card">
          <div class="card-head">
            <h2>${escapeHtml(skill.name)}</h2>
            <span class="score-chip">${escapeHtml(skill.mappingCount)} mappings</span>
          </div>
          <p class="detail-copy">${escapeHtml(skill.statement)}</p>
          <div class="mini-grid">
            <div class="mini-panel">
              <strong>${escapeHtml(skill.courseCount)}</strong>
              <span>Course coverage</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(skill.competencyNumbers.length)}</strong>
              <span>Competencies</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(skill.categories.length)}</strong>
              <span>Categories</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(skillDomains.length)}</strong>
              <span>Mapped domains</span>
            </div>
          </div>
          <div class="detail-section">
            <h3>Mapped Domains</h3>
            <div class="tag-row">
              ${skillDomains.map(function (domain) {
                return `<button class="tag tag-button" data-select-domain="${escapeHtml(domain.id)}">${escapeHtml(domain.name)}</button>`;
              }).join("")}
            </div>
          </div>
          <div class="detail-section">
            <h3>Supporting Categories</h3>
            <div class="tag-row">${renderTagList(skill.categories, "", 14)}</div>
          </div>
          <div class="detail-section">
            <h3>Program Sources</h3>
            <div class="tag-row">${renderTagList(skill.courseCodes, "course", 14)}</div>
          </div>
          <div class="detail-section">
            <h3>Competency References</h3>
            <div class="detail-list">
              ${skill.competencyNames.slice(0, 10).map(function (name, index) {
                return `
                  <div class="detail-list-static">
                    <strong>${escapeHtml(skill.competencyNumbers[index] || "")}</strong>
                    <span>${escapeHtml(name)}</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </article>
      </section>
    `;
  }

  function buildRecommendations() {
    const weakest = domainRecords.slice().sort(function (a, b) {
      return a.score - b.score;
    });
    const strongest = domainRecords.slice().sort(function (a, b) {
      return b.score - a.score;
    });
    const pendingCourses = courseLibrary.filter(function (course) {
      return course.status !== "Completed";
    });

    return [
      {
        title: "Raise " + weakest[0].name,
        body: "Use remaining coursework to make growth signals explicit instead of leaving them implied in course completion alone.",
        domain: weakest[0].id,
        course: weakest[0].nextCourses[0] ? weakest[0].nextCourses[0].code : "",
        stat: weakest[0].score + " current score",
      },
      {
        title: "Strengthen " + weakest[1].name,
        body: "Anchor the next round of evidence in later-term technical work so the domain reads as demonstrated, not adjacent.",
        domain: weakest[1].id,
        course: weakest[1].nextCourses[0] ? weakest[1].nextCourses[0].code : "D656",
        stat: weakest[1].score + " current score",
      },
      {
        title: "Convert " + strongest[0].name + " into visible artifacts",
        body: "The program is already strongest here. The opportunity is packaging that strength into portfolio-grade evidence and language.",
        domain: strongest[0].id,
        course: strongest[0].nextCourses[0] ? strongest[0].nextCourses[0].code : "D657",
        stat: strongest[0].score + " leading score",
      },
      {
        title: "Sequence the final terms around evidence density",
        body: "The cleanest final push comes from courses that can improve more than one domain at once while producing reusable work products.",
        domain: pendingCourses[0] ? "design" : weakest[0].id,
        course: pendingCourses[0] ? pendingCourses[0].code : "",
        stat: pendingCourses.length + " courses remaining",
      },
    ];
  }

  function renderRecommendations() {
    const cards = buildRecommendations();
    const strongestDomains = domainRecords.slice().sort(function (a, b) {
      return b.score - a.score;
    }).slice(0, 3).map(function (domain) {
      return Object.assign({}, domain, { domain: domain.id });
    });

    return `
      <section class="recommend-grid">
        ${cards.map(function (card) {
          return `
            <article class="card recommend-card">
              <div class="recommend-kicker">${escapeHtml(card.stat)}</div>
              <h2>${escapeHtml(card.title)}</h2>
              <p>${escapeHtml(card.body)}</p>
              <div class="action-row">
                <button class="action-button" data-select-domain="${escapeHtml(card.domain)}">Open domain</button>
                ${card.course ? `<button class="action-button action-button-secondary" data-select-course="${escapeHtml(card.course)}">Open course</button>` : ""}
              </div>
            </article>
          `;
        }).join("")}
      </section>
      <section class="overview-grid">
        <article class="card">
          <div class="card-head">
            <h2>Strongest Domains</h2>
          </div>
          ${renderBars(strongestDomains, 100, "domain")}
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Next Courses with the Most Leverage</h2>
          </div>
          <div class="detail-list">
            ${courseLibrary.filter(function (course) {
              return course.status !== "Completed";
            }).slice(0, 6).map(function (course) {
              return `
                <button class="detail-list-button" data-select-course="${escapeHtml(course.code)}">
                  <strong>${escapeHtml(course.code)}</strong>
                  <span>${escapeHtml(course.title)}</span>
                </button>
              `;
            }).join("")}
          </div>
        </article>
      </section>
    `;
  }

  function filterProgressCourses() {
    return courseLibrary.filter(function (course) {
      const query = state.timelineQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        (course.categoryNames || []).some(function (name) {
          return name.toLowerCase().includes(query);
        });
      const matchesStatus = state.timelineStatus === "all" || course.status.toLowerCase().replace(/\s+/g, "-") === state.timelineStatus;
      const matchesType = state.timelineType === "all" || course.type === state.timelineType;
      return matchesQuery && matchesStatus && matchesType;
    });
  }

  function renderProgressList() {
    const filteredCourses = filterProgressCourses();
    const terms = Array.from(new Set(filteredCourses.map(function (course) {
      return course.term;
    })));

    if (!filteredCourses.length) {
      return '<div class="empty-state">No courses match the current filters.</div>';
    }

    return terms.map(function (term) {
      return `
        <div class="term-block">
          <div class="term-label">Term ${escapeHtml(term)}</div>
          ${filteredCourses.filter(function (course) {
            return course.term === term;
          }).map(function (course) {
            return `
              <button class="course-item ${course.code === state.selectedCourse ? "course-item-active" : ""}" data-select-course="${escapeHtml(course.code)}">
                <div>
                  <strong>${escapeHtml(course.title)}</strong>
                  <div class="course-meta">
                    <span class="tag">${escapeHtml(course.code)}</span>
                    <span class="tag">${escapeHtml(TYPE_LABELS[course.type])}</span>
                  </div>
                </div>
                <span class="course-status course-status-${course.status.toLowerCase().replace(/\s+/g, "-")}">${escapeHtml(course.status)}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }).join("");
  }

  function renderProgress() {
    const course = selectedCourseRecord();

    return `
      <section class="metric-grid metric-grid-compact">
        ${renderMetricCard("Current Term", currentTerm(), "active sequence", "blue")}
        ${renderMetricCard("Completed", completedCourseCount(), "finished courses", "green")}
        ${renderMetricCard("In Progress", inProgressCourseCount(), "active now", "orange")}
        ${renderMetricCard("Pending", pendingCourseCount(), "remaining courses", "violet")}
      </section>
      <section class="split-layout">
        <article class="card sidebar-card">
          <div class="card-head">
            <h2>Program Progress</h2>
            <span class="eyebrow-inline">${escapeHtml(filterProgressCourses().length)} shown</span>
          </div>
          <div class="filter-stack">
            <div>
              <label class="field-label" for="timeline-query">Search title, code, or category</label>
              <input id="timeline-query" class="search-input" type="search" value="${escapeHtml(state.timelineQuery)}" data-field="timelineQuery" placeholder="Example: D656, design, communication" />
            </div>
            <div class="filter-grid">
              <label>
                <span class="field-label">Status</span>
                <select class="select-input" data-field="timelineStatus">
                  ${[
                    ["all", "All"],
                    ["completed", "Completed"],
                    ["in-progress", "In Progress"],
                    ["pending", "Pending"],
                  ].map(function (entry) {
                    return `<option value="${entry[0]}" ${state.timelineStatus === entry[0] ? "selected" : ""}>${entry[1]}</option>`;
                  }).join("")}
                </select>
              </label>
              <label>
                <span class="field-label">Area</span>
                <select class="select-input" data-field="timelineType">
                  <option value="all" ${state.timelineType === "all" ? "selected" : ""}>All</option>
                  ${Object.keys(TYPE_LABELS).map(function (type) {
                    return `<option value="${type}" ${state.timelineType === type ? "selected" : ""}>${escapeHtml(TYPE_LABELS[type])}</option>`;
                  }).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="scroll-list">${renderProgressList()}</div>
        </article>
        <article class="card detail-card">
          <div class="card-head">
            <h2>${escapeHtml(course.code)}: ${escapeHtml(course.title)}</h2>
            <span class="score-chip">${escapeHtml(course.status)}</span>
          </div>
          <div class="mini-grid">
            <div class="mini-panel">
              <strong>${escapeHtml(course.term)}</strong>
              <span>Term</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(course.skillCount || 0)}</strong>
              <span>Mapped skills</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(course.competencyCount || 0)}</strong>
              <span>Competencies</span>
            </div>
            <div class="mini-panel">
              <strong>${escapeHtml(course.categoryCount || 0)}</strong>
              <span>Categories</span>
            </div>
          </div>
          <div class="detail-section">
            <h3>Category Footprint</h3>
            <div class="tag-row">${renderTagList(course.categoryNames || [], "", 14)}</div>
          </div>
          <div class="detail-section">
            <h3>Competency Breakdown</h3>
            <div class="detail-list">
              ${(course.competencies || []).map(function (competency) {
                return `
                  <div class="detail-list-static">
                    <strong>${escapeHtml(competency.number)}</strong>
                    <span>${escapeHtml(competency.name)} (${escapeHtml(competency.skillCount)} skills)</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </article>
      </section>
    `;
  }

  function renderMethodology() {
    const selectedDomain = selectedDomainRecord();
    const selectedSkill = selectedSkillRecord();
    const selectedCourse = selectedCourseRecord();

    return `
      <section class="overview-grid methodology-grid">
        <article class="card">
          <div class="card-head">
            <h2>Source Materials</h2>
          </div>
          <div class="source-list">
            <div class="source-item">
              <strong>Course Skills Workbook</strong>
              <span>${escapeHtml(programData.summary.courseCount)} courses · ${escapeHtml(programData.summary.skillCount)} skills · ${escapeHtml(programData.summary.mappingCount)} mappings</span>
            </div>
            <div class="source-item">
              <strong>Reference PDF</strong>
              <span>Supporting source document committed alongside the dashboard.</span>
            </div>
            <div class="source-item">
              <strong>Generated JSON + global JS bundle</strong>
              <span>Browser-safe local data export used by GitHub Pages without a build step.</span>
            </div>
          </div>
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Scoring Logic</h2>
          </div>
          <div class="weight-list">
            <div class="weight-row">
              <div class="weight-head"><strong>Domain scores</strong><span>7 domains</span></div>
              <p>Domain scores are a presentation layer that groups related workbook categories into a stable executive view.</p>
            </div>
            <div class="weight-row">
              <div class="weight-head"><strong>Confidence model</strong><span>${escapeHtml(overallEQ())}%</span></div>
              <p>Confidence is shown as a weighted composite to mimic the reference dashboard while staying grounded in local workbook coverage.</p>
            </div>
            <div class="weight-row">
              <div class="weight-head"><strong>Deployment model</strong><span>Static</span></div>
              <p>The site runs client-side from committed files only, so it remains usable on GitHub Pages without API keys or a build pipeline.</p>
            </div>
          </div>
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Current Selection Snapshot</h2>
          </div>
          <div class="detail-list">
            <div class="detail-list-static"><strong>Domain</strong><span>${escapeHtml(selectedDomain.name)}</span></div>
            <div class="detail-list-static"><strong>Skill</strong><span>${escapeHtml(selectedSkill.name)}</span></div>
            <div class="detail-list-static"><strong>Course</strong><span>${escapeHtml(selectedCourse.code)}: ${escapeHtml(selectedCourse.title)}</span></div>
          </div>
        </article>
        <article class="card">
          <div class="card-head">
            <h2>Design Notes</h2>
          </div>
          <p class="detail-copy">
            This version intentionally mirrors the visual language from your recording: compact KPI cards, dark executive framing,
            tabbed analysis views, and an overview anchored by radar, trend, domain score, and evidence panels.
          </p>
        </article>
      </section>
    `;
  }

  function openDomainSource(domainId) {
    state.selectedDomain = domainId;
    state.activeTab = "domains";
  }

  function renderActiveTab() {
    if (state.activeTab === "domains") return renderDomains();
    if (state.activeTab === "evidence") return renderEvidence();
    if (state.activeTab === "recommendations") return renderRecommendations();
    if (state.activeTab === "progress") return renderProgress();
    if (state.activeTab === "methodology") return renderMethodology();
    return renderOverview();
  }

  function render(focusField, selectionStart, selectionEnd) {
    root.innerHTML = `
      <div class="dashboard-shell">
        ${renderHero()}
        ${renderTabNav()}
        ${renderActiveTab()}
      </div>
    `;

    if (focusField) {
      const field = root.querySelector('[data-field="' + focusField + '"]');
      if (field) {
        field.focus();
        if (typeof selectionStart === "number" && typeof field.setSelectionRange === "function") {
          const start = Math.min(selectionStart, field.value.length);
          const end = typeof selectionEnd === "number" ? Math.min(selectionEnd, field.value.length) : start;
          field.setSelectionRange(start, end);
        }
      }
    }
  }

  root.addEventListener("click", function (event) {
    const tabButton = event.target.closest("[data-tab]");
    if (tabButton) {
      state.activeTab = tabButton.getAttribute("data-tab");
      render();
      return;
    }

    const domainButton = event.target.closest("[data-select-domain]");
    if (domainButton) {
      openDomainSource(domainButton.getAttribute("data-select-domain"));
      render();
      return;
    }

    const skillButton = event.target.closest("[data-select-skill]");
    if (skillButton) {
      state.selectedSkill = skillButton.getAttribute("data-select-skill");
      state.activeTab = "evidence";
      render();
      return;
    }

    const courseButton = event.target.closest("[data-select-course]");
    if (courseButton) {
      state.selectedCourse = courseButton.getAttribute("data-select-course");
      state.activeTab = "progress";
      render();
    }
  });

  root.addEventListener("input", function (event) {
    const field = event.target.getAttribute("data-field");
    if (!field) return;
    const selectionStart = typeof event.target.selectionStart === "number" ? event.target.selectionStart : null;
    const selectionEnd = typeof event.target.selectionEnd === "number" ? event.target.selectionEnd : null;
    state[field] = event.target.value;
    render(field, selectionStart, selectionEnd);
  });

  root.addEventListener("change", function (event) {
    const field = event.target.getAttribute("data-field");
    if (!field) return;
    state[field] = event.target.value;
    render();
  });

  render();
})();
