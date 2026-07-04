// ---- Pipeline (signature element) ----
const pipelineSteps = [
  { kind: 'trigger', label: 'Trigger', title: 'New ticket created', sub: 'Zendesk · #inbound' },
  { kind: 'condition', label: 'Condition', title: 'Priority = High', sub: 'Filter step' },
  { kind: 'action', label: 'Action', title: 'Notify #support-urgent', sub: 'Slack' },
  { kind: 'action', label: 'Action', title: 'Create follow-up task', sub: 'Asana' },
];

const canvas = document.getElementById('pipelineCanvas');
pipelineSteps.forEach((step, i) => {
  const node = document.createElement('div');
  node.className = `node ${step.kind}`;
  node.innerHTML = `
    <p class="node-kind">${step.label}</p>
    <p class="node-title">${step.title}</p>
    <p class="node-sub">${step.sub}</p>
  `;
  canvas.appendChild(node);

  if (i < pipelineSteps.length - 1) {
    const connector = document.createElement('div');
    connector.className = 'connector';
    connector.innerHTML = `<div class="pulse"></div>`;
    canvas.appendChild(connector);
  }
});

// ---- Workflow list ----
const workflows = [
  { name: 'High-priority ticket alert', trigger: 'zendesk.ticket.created', lastRun: '2 min ago', success: 99.2, on: true },
  { name: 'New signup welcome sequence', trigger: 'app.user.signed_up', lastRun: '6 min ago', success: 100, on: true },
  { name: 'Weekly usage digest', trigger: 'schedule.weekly_mon_9am', lastRun: '2 days ago', success: 97.5, on: true },
  { name: 'Failed payment recovery', trigger: 'stripe.invoice.payment_failed', lastRun: '18 min ago', success: 94.1, on: true },
  { name: 'Churn-risk flag to CRM', trigger: 'analytics.risk_score.updated', lastRun: '41 min ago', success: 98.8, on: true },
  { name: 'Legacy CSV export (deprecated)', trigger: 'schedule.daily_midnight', lastRun: '3 days ago', success: 88.0, on: false },
];

document.getElementById('workflowsBody').innerHTML = workflows.map(w => `
  <tr>
    <td class="wf-name">${w.name}</td>
    <td class="wf-trigger">${w.trigger}</td>
    <td>${w.lastRun}</td>
    <td>${w.success.toFixed(1)}%</td>
    <td>
      <span class="status-toggle ${w.on ? 'on' : 'off'}">
        <span class="dot-sm"></span>${w.on ? 'Active' : 'Paused'}
      </span>
    </td>
  </tr>
`).join('');

// ---- Execution log ----
const logs = [
  { status: 'ok', text: 'Failed payment recovery ran successfully for invoice #8841', time: '12:41:02' },
  { status: 'ok', text: 'Welcome sequence sent to 14 new signups', time: '12:38:47' },
  { status: 'warn', text: 'Churn-risk flag skipped 1 record — missing account ID', time: '12:33:19' },
  { status: 'fail', text: 'Legacy CSV export failed — auth token expired', time: '12:20:05' },
  { status: 'ok', text: 'High-priority ticket alert notified #support-urgent', time: '12:18:52' },
  { status: 'ok', text: 'High-priority ticket alert notified #support-urgent', time: '12:04:11' },
  { status: 'ok', text: 'Weekly usage digest generated and emailed to 6 admins', time: '09:00:00' },
];

document.getElementById('logList').innerHTML = logs.map(l => `
  <div class="log-item">
    <span class="log-dot ${l.status}"></span>
    <span class="log-text">${l.text}<span class="log-time">${l.time}</span></span>
  </div>
`).join('');

// ---- Integrations ----
const integrations = [
  { name: 'Slack', initials: 'SL', color: '#7C5CFC' },
  { name: 'Zendesk', initials: 'ZD', color: '#F2A65A' },
  { name: 'Stripe', initials: 'ST', color: '#5C7CFC' },
  { name: 'Asana', initials: 'AS', color: '#F2617A' },
  { name: 'Gmail', initials: 'GM', color: '#A6E22E' },
  { name: 'Sheets', initials: 'SH', color: '#3FBF7F' },
];

document.getElementById('integrationsGrid').innerHTML = integrations.map(app => `
  <div class="integration">
    <div class="ico" style="background:${app.color}">${app.initials}</div>
    <span class="name">${app.name}</span>
    Connected
  </div>
`).join('');

// ---- New workflow button (placeholder action) ----
document.getElementById('newWorkflowBtn').addEventListener('click', () => {
  alert('This is a demo build — wire this button up to your workflow builder / modal.');
});
