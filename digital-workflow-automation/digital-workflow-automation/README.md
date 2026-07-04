# Digital Workflow Automation

A front-end dashboard for a workflow automation platform (think: a simplified
Zapier/n8n-style control panel). Shows a live automation pipeline, workflow
list, execution log, and connected integrations. Built with plain HTML, CSS,
and JavaScript — no frameworks or build step.

## Project structure

```
digital-workflow-automation/
├── index.html        Page markup
├── css/
│   └── style.css      All styling (colors, layout, animation)
├── js/
│   └── script.js       Mock data + DOM rendering + interactivity
└── README.md
```

## Running it

Just open `index.html` in a browser, or serve the folder locally:

```
cd digital-workflow-automation
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What's on the dashboard

- **Live pipeline** – an animated trigger → condition → action → action flow,
  showing a pulse traveling along the connections as the automation "runs"
- **KPI row** – active workflows, runs today, success rate, hours saved
- **Workflow list** – each automation's trigger, last run, success rate, and
  active/paused status
- **Execution log** – a running feed of recent automation runs, color-coded
  by outcome (success / warning / failure)
- **Connected apps** – the integrations currently wired into the platform

## Using real data

All mock data lives in `js/script.js`:

- `pipelineSteps` — nodes shown in the live pipeline diagram
- `workflows` — rows in the workflow table
- `logs` — entries in the execution log
- `integrations` — connected app tiles

Replace these arrays with a `fetch()` call to your backend and keep the same
object shape (e.g. `{name, trigger, lastRun, success, on}` for workflows) so
the rendering code doesn't need to change.

The "+ New workflow" button currently shows a placeholder alert — wire
`newWorkflowBtn`'s click handler in `script.js` up to your actual workflow
builder or a modal.

## Customizing the look

Colors are defined as CSS variables at the top of `css/style.css`:

```css
:root{
  --ink:#101322;      /* page background */
  --panel:#171B2E;    /* card background */
  --violet:#7C5CFC;   /* primary accent (triggers, brand) */
  --lime:#A6E22E;      /* success / active / running */
  --amber:#F2A65A;    /* warnings / conditions */
  --coral:#F2617A;    /* failures / critical */
  --fog:#8890B5;       /* muted text */
  --paper:#E6E9F5;    /* primary text */
}
```

Change these to re-theme the whole dashboard without touching layout code.
