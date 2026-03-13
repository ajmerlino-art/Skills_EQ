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
    "gen-ed": "#708090",
    power: "#ffb84d",
    "bus-core": "#3ea7ff",
    design: "#ff7a3d",
    hr: "#37c78e",
  };

  const DOMAIN_SCORES = [
    { id: "design", name: "Design Core", score: 86, color: "linear-gradient(90deg, #ff9a62, #ff7a3d)" },
    { id: "research", name: "Research and Insights", score: 82, color: "linear-gradient(90deg, #72c6ff, #3ea7ff)" },
    { id: "communication", name: "Communication", score: 79, color: "linear-gradient(90deg, #69ddb0, #37c78e)" },
    { id: "collaboration", name: "Collaboration and Leadership", score: 75, color: "linear-gradient(90deg, #c09cff, #9f7aea)" },
    { id: "problem", name: "Problem Solving", score: 84, color: "linear-gradient(90deg, #ffc979, #ffb84d)" },
    { id: "professional", name: "Professional Growth", score: 72, color: "linear-gradient(90deg, #ff93a0, #ff6f7d)" },
    { id: "tech", name: "Technology and AI", score: 77, color: "linear-gradient(90deg, #7be6ff, #34c8dd)" },
  ];

  const DOMAIN_SOURCE_MAP = {
    design: { tab: "categories", category: "User Experience (UX) Design" },
    research: { tab: "categories", category: "Research" },
    communication: { tab: "categories", category: "Communication" },
    collaboration: { tab: "categories", category: "Leadership" },
    problem: { tab: "categories", category: "Problem Solving" },
    professional: { tab: "categories", category: "Career Development" },
    tech: { tab: "categories", category: "Artificial Intelligence (AI)" },
  };

  const EVIDENCE_DISTRIBUTION = [
    { name: "Assessments", value: 44, color: "linear-gradient(90deg, #ff9a62, #ff7a3d)" },
    { name: "Work Products", value: 26, color: "linear-gradient(90deg, #72c6ff, #3ea7ff)" },
    { name: "Credentials", value: 7, color: "linear-gradient(90deg, #69ddb0, #37c78e)" },
    { name: "Self Attested", value: 18, color: "linear-gradient(90deg, #c09cff, #9f7aea)" },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Skills" },
    { id: "categories", label: "Categories" },
    { id: "timeline", label: "Timeline" },
    { id: "sources", label: "Sources" },
  ];

  const sourceByCode = Object.fromEntries(programData.courses.map((course) => [course.code, course]));
  const skills = programData.skills.slice().sort((a, b) => b.mappingCount - a.mappingCount || a.name.localeCompare(b.name));
  const categories = programData.categories.slice().sort((a, b) => b.mappingCount - a.mappingCount || a.name.localeCompare(b.name));
  const courseLibrary = PROGRAM_COURSES.map((course, index) => {
    let status = "Pending";
    if (index < 28) status = "Completed";
    else if (index < 30) status = "In Progress";
    return Object.assign({}, course, sourceByCode[course.code] || {}, { status: status });
  });

  const state = {
    activeTab: "overview",
    selectedSkill: skills[0] ? skills[0].name : "",
    selectedCategory: categories[0] ? categories[0].name : "",
    selectedCourse: courseLibrary[0] ? courseLibrary[0].code : "",
    skillQuery: "",
    categoryQuery: "",
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

  function selectedSkillRecord() {
    return skills.find((skill) => skill.name === state.selectedSkill) || skills[0];
  }

  function selectedCategoryRecord() {
    return categories.find((category) => category.name === state.selectedCategory) || categories[0];
  }

  function selectedCourseRecord() {
    return courseLibrary.find((course) => course.code === state.selectedCourse) || courseLibrary[0];
  }

  function openDomainSource(domainId) {
    const source = DOMAIN_SOURCE_MAP[domainId];
    if (!source) return;
    if (source.tab === "categories" && source.category) {
      state.selectedCategory = source.category;
      state.categoryQuery = "";
      state.activeTab = "categories";
      return;
    }
    if (source.tab === "skills" && source.skill) {
      state.selectedSkill = source.skill;
      state.skillQuery = "";
      state.activeTab = "skills";
      return;
    }
    if (source.tab === "timeline" && source.course) {
      state.selectedCourse = source.course;
      state.timelineQuery = "";
      state.activeTab = "timeline";
    }
  }

  function overallEQ() {
    return Math.round(DOMAIN_SCORES.reduce((sum, item) => sum + item.score, 0) / DOMAIN_SCORES.length);
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

  function barList(items, maxValue, actionName) {
    return `
      <div class="bar-list">
        ${items
          .map((item) => {
            const value = item.score || item.value || item.mappingCount;
            const width = Math.max(8, Math.round((value / maxValue) * 100));
            const action = actionName ? `data-select-${actionName}="${escapeHtml(item[actionName])}"` : "";
            return `
              <button class="bar-row ${actionName ? "interactive-row" : ""}" ${action}>
                <div class="bar-head">
                  <span class="bar-label">${escapeHtml(item.name)}</span>
                  <span class="bar-value">${escapeHtml(value)}</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width:${width}%;background:${item.color || "linear-gradient(90deg,#ff9a62,#ff7a3d)"}"></div>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function radarChart(items) {
    const width = 420;
    const height = 340;
    const cx = 210;
    const cy = 158;
    const radius = 92;
    const levels = 4;

    function wrapLabel(label) {
      const words = label.split(" ");
      const lines = [];
      let current = "";
      const maxChars = 16;

      words.forEach(function (word) {
        const next = current ? current + " " + word : word;
        if (next.length <= maxChars || !current) current = next;
        else {
          lines.push(current);
          current = word;
        }
      });

      if (current) lines.push(current);
      return lines.slice(0, 3);
    }

    function point(angleIndex, scale) {
      const angle = (-Math.PI / 2) + ((Math.PI * 2) / items.length) * angleIndex;
      const r = radius * scale;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
      };
    }

    const grid = Array.from({ length: levels }, function (_, index) {
      const scale = (index + 1) / levels;
      const points = items.map(function (_, itemIndex) {
        const p = point(itemIndex, scale);
        return p.x.toFixed(1) + "," + p.y.toFixed(1);
      }).join(" ");
      return '<polygon class="radar-grid-shape" points="' + points + '"></polygon>';
    }).join("");

    const axes = items.map(function (_, index) {
      const p = point(index, 1);
      return '<line class="radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' + p.x.toFixed(1) + '" y2="' + p.y.toFixed(1) + '"></line>';
    }).join("");

    const dataPoints = items.map(function (item, index) {
      const p = point(index, item.score / 100);
      return p.x.toFixed(1) + "," + p.y.toFixed(1);
    }).join(" ");
    const closedDataPoints = dataPoints + " " + (function () {
      const first = point(0, items[0].score / 100);
      return first.x.toFixed(1) + "," + first.y.toFixed(1);
    })();

    const hotspots = items.map(function (item, index) {
      const dataPoint = point(index, item.score / 100);
      const p = point(index, 1.12);
      const anchor = p.x < cx - 20 ? "end" : p.x > cx + 20 ? "start" : "middle";
      const lines = wrapLabel(item.name);
      const startY = p.y - ((lines.length - 1) * 6);
      return '<g class="radar-hotspot" data-select-domain="' + escapeHtml(item.id) + '">' +
        '<circle class="radar-hit-area" cx="' + dataPoint.x.toFixed(1) + '" cy="' + dataPoint.y.toFixed(1) + '" r="18"></circle>' +
        '<circle class="radar-dot" cx="' + dataPoint.x.toFixed(1) + '" cy="' + dataPoint.y.toFixed(1) + '" r="4.5"></circle>' +
        '<text class="radar-label" x="' + p.x.toFixed(1) + '" y="' + startY.toFixed(1) + '" text-anchor="' + anchor + '">' +
        lines.map(function (line, lineIndex) {
          return '<tspan x="' + p.x.toFixed(1) + '" dy="' + (lineIndex === 0 ? 0 : 12) + '">' + escapeHtml(line) + "</tspan>";
        }).join("") +
        "</text></g>";
    }).join("");

    const ticks = [25, 50, 75, 100].map(function (tick, index) {
      return '<text class="radar-tick" x="' + (cx + 8) + '" y="' + (cy - (radius * ((index + 1) / levels)) + 4).toFixed(1) + '">' + tick + "</text>";
    }).join("");

    return `
      <div class="radar-card-wrap">
        <svg class="radar-svg" viewBox="0 0 ${width} ${height}" aria-label="Skill domain radar chart" role="img">
          ${grid}
          ${axes}
          <polygon class="radar-data-fill" points="${dataPoints}"></polygon>
          <polyline class="radar-data-line" points="${closedDataPoints}"></polyline>
          ${hotspots}
          ${ticks}
        </svg>
        <div class="radar-legend">
          ${items.map(function (item) {
            return `
              <button class="radar-legend-item" data-select-domain="${escapeHtml(item.id)}">
                <span class="radar-legend-dot"></span>
                <span>${escapeHtml(item.name)}</span>
                <strong>${escapeHtml(item.score)}</strong>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function chips(values, kind, limit) {
    return values
      .slice(0, limit || values.length)
      .map((value) => `<button class="chip chip-button" data-chip-kind="${kind}" data-chip-value="${escapeHtml(value)}">${escapeHtml(value)}</button>`)
      .join("");
  }

  function renderHero() {
    return `
      <section class="hero">
        <div>
          <div class="eyebrow"><span class="eyebrow-dot"></span> Interactive GitHub Pages Dashboard</div>
          <h1>${escapeHtml(programData.summary.programTitle)}</h1>
          <p>
            Rich-skill dashboard rebuilt as a client-side local app. It runs directly from committed files,
            but now supports tabbed exploration, search, filtering, and detail panels for skills, categories,
            and courses.
          </p>
          <div class="hero-meta">
            <span class="meta-pill">${escapeHtml(programData.summary.programCode)}</span>
            <span class="meta-pill">${escapeHtml(programData.summary.courseCount)} courses</span>
            <span class="meta-pill">${escapeHtml(programData.summary.competencyCount)} competencies</span>
            <span class="meta-pill">${escapeHtml(programData.summary.mappingCount)} rich-skill mappings</span>
          </div>
        </div>
        <div class="gauge-card">
          <div class="gauge" style="--pct:${overallEQ() / 100}turn">
            <strong>${overallEQ()}</strong>
          </div>
          <span>Composite Skills EQ</span>
        </div>
      </section>
    `;
  }

  function renderTabNav() {
    return `
      <section class="tab-strip card">
        <div class="tab-nav">
          ${tabs
            .map((tab) => `
              <button class="tab-button ${tab.id === state.activeTab ? "tab-button-active" : ""}" data-tab="${tab.id}">
                ${escapeHtml(tab.label)}
              </button>
            `)
            .join("")}
        </div>
      </section>
    `;
  }

  function renderOverview() {
    const topCategories = categories.slice(0, 6);
    const denseCourses = programData.courses.slice().sort((a, b) => b.skillCount - a.skillCount).slice(0, 6);
    return `
      <section class="stats-grid">
        ${statCard("Program Completion", "74%", "28 of 38 courses completed in this prototype", "var(--green)")}
        ${statCard("Distinct Skills", programData.summary.skillCount, "Indexed from the attached workbook", "var(--accent)")}
        ${statCard("Competencies", programData.summary.competencyCount, "Workbook competencies mapped to rich skills", "var(--blue)")}
        ${statCard("Tracked Domains", DOMAIN_SCORES.length, "Interactive exploration tabs below", "var(--gold)")}
      </section>
      <section class="section-grid">
        <article class="card">
          <div class="card-title">
            <h2>Skill Domain Profile</h2>
            <span class="chip">Click any spoke to open its source</span>
          </div>
          ${radarChart(DOMAIN_SCORES)}
        </article>
        <article class="card">
          <div class="card-title">
            <h2>Domain Scores</h2>
            <span class="chip">Click any row to open its source</span>
          </div>
          ${barList(DOMAIN_SCORES.map((item) => Object.assign({}, item, { domain: item.id })), 100, "domain")}
        </article>
        <article class="card">
          <div class="card-title">
            <h2>Evidence Distribution</h2>
            <span class="chip">Prototype weighting model</span>
          </div>
          ${barList(EVIDENCE_DISTRIBUTION, 50)}
        </article>
        <article class="card">
          <div class="card-title">
            <h2>Top Program Categories</h2>
            <span class="chip">Select to inspect</span>
          </div>
          ${barList(topCategories.map((item) => Object.assign({}, item, { category: item.name })), topCategories[0].mappingCount, "category")}
        </article>
        <article class="card">
          <div class="card-title">
            <h2>Most Dense Courses</h2>
            <span class="chip">Select to inspect</span>
          </div>
          <div class="rank-list">
            ${denseCourses
              .map((course) => `
                <button class="rank-item interactive-row" data-select-course="${escapeHtml(course.code)}">
                  <span class="rank-pill">${escapeHtml(course.code)}</span>
                  <div>
                    <strong>${escapeHtml(course.title)}</strong>
                    <div class="card-note">${escapeHtml(course.skillCount)} mapped skills and ${escapeHtml(course.competencyCount)} competencies</div>
                  </div>
                  <span class="chip">${escapeHtml(course.categoryNames.slice(0, 2).join(", "))}</span>
                </button>
              `)
              .join("")}
          </div>
        </article>
      </section>
    `;
  }

  function renderSkills() {
    const filteredSkills = skills.filter((skill) => {
      const q = state.skillQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.statement.toLowerCase().includes(q) ||
        skill.categories.some((category) => category.toLowerCase().includes(q)) ||
        skill.courseCodes.some((code) => code.toLowerCase().includes(q))
      );
    });
    const skill = selectedSkillRecord();
    return `
      <section class="interactive-grid">
        <article class="card list-panel">
          <div class="card-title">
            <h2>Skills</h2>
            <span class="chip">${escapeHtml(filteredSkills.length)} shown</span>
          </div>
          <label class="field-label" for="skill-query">Search skills, categories, or course codes</label>
          <input id="skill-query" class="search-input" type="search" value="${escapeHtml(state.skillQuery)}" data-field="skillQuery" placeholder="Example: communication, D656, ethics" />
          <div class="list-scroll">
            ${filteredSkills
              .slice(0, 120)
              .map((item) => `
                <button class="list-item ${item.name === skill.name ? "list-item-active" : ""}" data-select-skill="${escapeHtml(item.name)}">
                  <div class="list-item-title">${escapeHtml(item.name)}</div>
                  <div class="list-item-meta">${escapeHtml(item.mappingCount)} mappings across ${escapeHtml(item.courseCount)} course${item.courseCount === 1 ? "" : "s"}</div>
                </button>
              `)
              .join("") || '<div class="empty-state">No skills match the current search.</div>'}
          </div>
        </article>
        <article class="card detail-panel">
          <div class="card-title">
            <h2>${escapeHtml(skill.name)}</h2>
            <span class="chip">${escapeHtml(skill.mappingCount)} mappings</span>
          </div>
          <p class="detail-lead">${escapeHtml(skill.statement)}</p>
          <div class="detail-stats">
            <div class="mini-panel"><strong>${escapeHtml(skill.courseCount)}</strong><span>Course coverage</span></div>
            <div class="mini-panel"><strong>${escapeHtml(skill.competencyNumbers.length)}</strong><span>Competencies</span></div>
            <div class="mini-panel"><strong>${escapeHtml(skill.categories.length)}</strong><span>Categories</span></div>
          </div>
          <div class="detail-section">
            <h3>Categories</h3>
            <div class="tag-row">${chips(skill.categories, "category", 10)}</div>
          </div>
          <div class="detail-section">
            <h3>Related Courses</h3>
            <div class="tag-row">${chips(skill.courseCodes, "course", 12)}</div>
          </div>
          <div class="detail-section">
            <h3>Competencies</h3>
            <div class="detail-list">
              ${skill.competencyNames
                .slice(0, 10)
                .map((name, index) => `
                  <div class="detail-list-item">
                    <strong>${escapeHtml(skill.competencyNumbers[index] || "")}</strong>
                    <span>${escapeHtml(name)}</span>
                  </div>
                `)
                .join("")}
            </div>
          </div>
          <div class="detail-section">
            <a class="source-link" href="${escapeHtml(skill.uri)}" target="_blank" rel="noreferrer">
              <div>
                <strong>Open OSMT Skill Reference</strong>
                <span>Direct URI from the workbook export</span>
              </div>
              <span class="chip">Open link</span>
            </a>
          </div>
        </article>
      </section>
    `;
  }

  function renderCategories() {
    const filteredCategories = categories.filter((category) => {
      const q = state.categoryQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        category.name.toLowerCase().includes(q) ||
        category.skillNames.some((name) => name.toLowerCase().includes(q)) ||
        category.courseCodes.some((code) => code.toLowerCase().includes(q))
      );
    });
    const category = selectedCategoryRecord();
    return `
      <section class="interactive-grid">
        <article class="card list-panel">
          <div class="card-title">
            <h2>Categories</h2>
            <span class="chip">${escapeHtml(filteredCategories.length)} shown</span>
          </div>
          <label class="field-label" for="category-query">Search categories, skills, or course codes</label>
          <input id="category-query" class="search-input" type="search" value="${escapeHtml(state.categoryQuery)}" data-field="categoryQuery" placeholder="Example: critical thinking, leadership, D265" />
          <div class="list-scroll">
            ${filteredCategories
              .slice(0, 120)
              .map((item) => `
                <button class="list-item ${item.name === category.name ? "list-item-active" : ""}" data-select-category="${escapeHtml(item.name)}">
                  <div class="list-item-title">${escapeHtml(item.name)}</div>
                  <div class="list-item-meta">${escapeHtml(item.mappingCount)} mappings, ${escapeHtml(item.skillCount)} skills, ${escapeHtml(item.courseCount)} courses</div>
                </button>
              `)
              .join("") || '<div class="empty-state">No categories match the current search.</div>'}
          </div>
        </article>
        <article class="card detail-panel">
          <div class="card-title">
            <h2>${escapeHtml(category.name)}</h2>
            <span class="chip">${escapeHtml(category.mappingCount)} mappings</span>
          </div>
          <div class="detail-stats">
            <div class="mini-panel"><strong>${escapeHtml(category.skillCount)}</strong><span>Skills</span></div>
            <div class="mini-panel"><strong>${escapeHtml(category.courseCount)}</strong><span>Courses</span></div>
            <div class="mini-panel"><strong>${escapeHtml(category.mappingCount)}</strong><span>Total mappings</span></div>
          </div>
          <div class="detail-section">
            <h3>Courses in This Category</h3>
            <div class="tag-row">${chips(category.courseCodes, "course", 16)}</div>
          </div>
          <div class="detail-section">
            <h3>Top Skills</h3>
            <div class="detail-list">
              ${category.skillNames
                .slice(0, 18)
                .map((name) => `
                  <button class="detail-list-item detail-list-button" data-select-skill="${escapeHtml(name)}">
                    <strong>Skill</strong>
                    <span>${escapeHtml(name)}</span>
                  </button>
                `)
                .join("")}
            </div>
          </div>
        </article>
      </section>
    `;
  }

  function filterTimelineCourses() {
    return courseLibrary.filter((course) => {
      const q = state.timelineQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        (course.categoryNames || []).some((name) => name.toLowerCase().includes(q));
      const matchesStatus = state.timelineStatus === "all" || course.status.toLowerCase().replace(/\s+/g, "-") === state.timelineStatus;
      const matchesType = state.timelineType === "all" || course.type === state.timelineType;
      return matchesQuery && matchesStatus && matchesType;
    });
  }

  function renderTimelineList() {
    const filteredCourses = filterTimelineCourses();
    const terms = Array.from(new Set(filteredCourses.map((course) => course.term)));
    if (!filteredCourses.length) {
      return '<div class="empty-state">No courses match the current timeline filters.</div>';
    }
    return terms
      .map((term) => `
        <div class="term-block">
          <div class="term-label">Term ${term}</div>
          ${filteredCourses
            .filter((course) => course.term === term)
            .map((course) => `
              <button class="course-item interactive-row ${course.code === state.selectedCourse ? "course-item-active" : ""}" style="border-left-color:${TYPE_COLORS[course.type]}" data-select-course="${escapeHtml(course.code)}">
                <div>
                  <strong>${escapeHtml(course.title)}</strong>
                  <div class="course-meta">
                    <span class="chip">${escapeHtml(course.code)}</span>
                    <span class="chip">${escapeHtml(TYPE_LABELS[course.type])}</span>
                    <span class="chip">${escapeHtml(course.skillCount || 0)} mapped skills</span>
                  </div>
                </div>
                <div class="course-status ${course.status === "Completed" ? "status-completed" : course.status === "In Progress" ? "status-progress" : "status-pending"}">${escapeHtml(course.status)}</div>
              </button>
            `)
            .join("")}
        </div>
      `)
      .join("");
  }

  function renderTimeline() {
    const course = selectedCourseRecord();
    return `
      <section class="interactive-grid">
        <article class="card list-panel">
          <div class="card-title">
            <h2>Timeline</h2>
            <span class="chip">${escapeHtml(filterTimelineCourses().length)} shown</span>
          </div>
          <div class="filter-stack">
            <div>
              <label class="field-label" for="timeline-query">Search title, code, or category</label>
              <input id="timeline-query" class="search-input" type="search" value="${escapeHtml(state.timelineQuery)}" data-field="timelineQuery" placeholder="Example: D656, design, statistics" />
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
                  ]
                    .map(([value, label]) => `<option value="${value}" ${state.timelineStatus === value ? "selected" : ""}>${label}</option>`)
                    .join("")}
                </select>
              </label>
              <label>
                <span class="field-label">Area</span>
                <select class="select-input" data-field="timelineType">
                  <option value="all" ${state.timelineType === "all" ? "selected" : ""}>All</option>
                  ${Object.keys(TYPE_LABELS)
                    .map((type) => `<option value="${type}" ${state.timelineType === type ? "selected" : ""}>${escapeHtml(TYPE_LABELS[type])}</option>`)
                    .join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="list-scroll timeline-scroll">${renderTimelineList()}</div>
        </article>
        <article class="card detail-panel">
          <div class="card-title">
            <h2>${escapeHtml(course.code)}: ${escapeHtml(course.title)}</h2>
            <span class="chip">${escapeHtml(course.status)}</span>
          </div>
          <div class="detail-stats">
            <div class="mini-panel"><strong>${escapeHtml(course.term)}</strong><span>Term</span></div>
            <div class="mini-panel"><strong>${escapeHtml(course.skillCount || 0)}</strong><span>Mapped skills</span></div>
            <div class="mini-panel"><strong>${escapeHtml(course.competencyCount || 0)}</strong><span>Competencies</span></div>
          </div>
          <div class="detail-section">
            <h3>Category Footprint</h3>
            <div class="tag-row">${chips(course.categoryNames || [], "category", 12)}</div>
          </div>
          <div class="detail-section">
            <h3>Competency Breakdown</h3>
            <div class="detail-list">
              ${(course.competencies || [])
                .map((competency) => `
                  <div class="detail-list-item">
                    <strong>${escapeHtml(competency.number)}</strong>
                    <span>${escapeHtml(competency.name)} (${escapeHtml(competency.skillCount)} skills)</span>
                  </div>
                `)
                .join("")}
            </div>
          </div>
        </article>
      </section>
    `;
  }

  function renderSources() {
    const selectedSkill = selectedSkillRecord();
    const selectedCategory = selectedCategoryRecord();
    const selectedCourse = selectedCourseRecord();
    return `
      <section class="section-grid">
        <article class="card">
          <div class="card-title">
            <h2>Source Files</h2>
            <span class="chip">Bundled in repo</span>
          </div>
          <p class="card-note">
            The interactive dashboard runs on committed local files only. The workbook is transformed into JSON and
            a browser-safe global JS file so GitHub Pages can serve the experience without a build pipeline.
          </p>
          <div class="source-links">
            <div class="source-link source-link-static">
              <div>
                <strong>Course Skills Workbook</strong>
                <span>${escapeHtml(programData.summary.courseCount)} courses, ${escapeHtml(programData.summary.skillCount)} skills, ${escapeHtml(programData.summary.mappingCount)} mappings</span>
              </div>
            </div>
            <div class="source-link source-link-static">
              <div>
                <strong>Reference PDF</strong>
                <span>Supporting source document included in the repository</span>
              </div>
            </div>
            <div class="source-link source-link-static">
              <div>
                <strong>Generated JSON</strong>
                <span>Machine-readable workbook export used by the interface</span>
              </div>
            </div>
          </div>
        </article>
        <article class="card">
          <div class="card-title">
            <h2>Current Selection Snapshot</h2>
            <span class="chip">Cross-tab state</span>
          </div>
          <div class="detail-list">
            <div class="detail-list-item"><strong>Skill</strong><span>${escapeHtml(selectedSkill.name)}</span></div>
            <div class="detail-list-item"><strong>Category</strong><span>${escapeHtml(selectedCategory.name)}</span></div>
            <div class="detail-list-item"><strong>Course</strong><span>${escapeHtml(selectedCourse.code)}: ${escapeHtml(selectedCourse.title)}</span></div>
          </div>
          <div class="detail-section">
            <h3>Methodology</h3>
            <p class="detail-lead">
              Assessment evidence carries the most weight, followed by work products, credentials, and self-attested skills.
              The page is interactive, but the data flow is static-first and local so it stays reliable on GitHub Pages.
            </p>
          </div>
        </article>
      </section>
    `;
  }

  function renderActiveTab() {
    if (state.activeTab === "skills") return renderSkills();
    if (state.activeTab === "categories") return renderCategories();
    if (state.activeTab === "timeline") return renderTimeline();
    if (state.activeTab === "sources") return renderSources();
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
      state.activeTab = "skills";
      render();
      return;
    }

    const categoryButton = event.target.closest("[data-select-category]");
    if (categoryButton) {
      state.selectedCategory = categoryButton.getAttribute("data-select-category");
      state.activeTab = "categories";
      render();
      return;
    }

    const courseButton = event.target.closest("[data-select-course]");
    if (courseButton) {
      state.selectedCourse = courseButton.getAttribute("data-select-course");
      state.activeTab = "timeline";
      render();
      return;
    }

    const chipButton = event.target.closest("[data-chip-kind]");
    if (chipButton) {
      const kind = chipButton.getAttribute("data-chip-kind");
      const value = chipButton.getAttribute("data-chip-value");
      if (kind === "category") {
        state.selectedCategory = value;
        state.activeTab = "categories";
      } else if (kind === "course") {
        state.selectedCourse = value;
        state.activeTab = "timeline";
      }
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
