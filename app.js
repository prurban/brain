// PR Urban Brain — searchable business manual with cloud sync.
'use strict';

const SYNC_KEY = 'brain-sync-url';
const CACHE_KEY = 'brain-cache';

const SECTIONS = [
  { id: 'sop',   name: 'SOPs',      color: '#ff4fa3' },
  { id: 'staff', name: 'Staff',     color: '#66b3ff' },
  { id: 'vault', name: 'Vault',     color: '#7bd88f' },
  { id: 'mkt',   name: 'Marketing', color: '#ffcc66' },
];
const secOf = id => SECTIONS.find(s => s.id === id) || SECTIONS[0];

// ---------- seed content (used when the cloud is empty) ----------
const SEED_ARTICLES = [
{ id:'a-start', sec:'vault', title:'START HERE — how to use this Brain', body:
`This app is the **single source of truth** for how PR Urban Dance runs. If it's not in here, it's in someone's head — and heads forget, get sick and go on holidays.

## The rules
- When you work out how to do something, **write it in here** straight away.
- When something changes (price, contact, procedure), **update the article** — never let the Brain drift out of date.
- Anything marked **[FILL IN]** still needs Paiige's real details — replace it with the truth and delete the tag.

## Finding things
Use the search bar at the top — it looks through every word of every article. The coloured chips filter by section: **SOPs** (how we do things), **Staff** (people & onboarding), **Vault** (key info & links), **Marketing** (growing the business).

## Editing
Tap an article, hit **Edit**, change it, **Save**. The **+** button adds a new article. Everything syncs instantly to everyone connected.` },

// ------------------- SOPs -------------------
{ id:'a-open', sec:'sop', title:'Opening the studio', body:
`Arrive **at least 20 minutes** before the first class.

1. Unlock, lights on, aircon/fans on — set to [FILL IN preferred temp].
2. Walk the floor: check for hazards (wet spots, loose flooring, anything left out). Fix or cordon off before anyone dances.
3. Set up the sound system and test music at class volume.
4. Check the first aid kit is where it lives: [FILL IN location].
5. Put out sign-in sheet / open the class roll.
6. Unlock the front entrance no earlier than 15 minutes before class — students wait in [FILL IN waiting area] until the teacher invites them in.

**Why the walk-through matters:** insurance claims live or die on whether we checked the space. Two minutes of looking saves months of paperwork.` },

{ id:'a-close', sec:'sop', title:'Closing the studio', body:
`Never leave until **every student has been collected** — see the uncollected child procedure in the incident SOP.

1. Sound system off, equipment back in its place.
2. Lost property into the box: [FILL IN location].
3. Quick floor sweep / wipe-down of high-touch surfaces.
4. Bins out if it's [FILL IN bin night].
5. Aircon off, lights off, windows locked.
6. Lock all doors and set the alarm: code holder list is in the Vault.
7. Message Paiige "closed and locked" in [FILL IN group chat] — this is how we know the studio is secure.` },

{ id:'a-class', sec:'sop', title:'Running a class — before, during, after', body:
`## Before
- Music playlist ready **before** students arrive — dead air kills energy.
- Mark the roll as students enter. The roll is our legal record of who was in the building.
- New face? They must have a completed enrolment/trial form before they join in — no form, no dance (insurance requirement).

## During
- Warm-up first, always — injuries in unwarmed bodies are on us.
- Phones away except for filming choreo at the teacher's direction.
- Behaviour issues: one quiet warning, then sit them out for 5 minutes, then note it for Paiige. Never shout, never physical.

## After
- Finish **on time** — parents plan around it.
- Students under 12 are handed to a known adult only. If someone unexpected is collecting, phone the listed parent to confirm.
- 60-second reset: floor clear, notes on anything for the next teacher.` },

{ id:'a-enrol', sec:'sop', title:'New student enrolment', body:
`1. Every student needs a completed **enrolment form** before their first full class: name, DOB, parent/guardian, emergency contact, medical notes (allergies, asthma, injuries), photo/social media permission tick-box.
2. Enter them into the PR Urban OS pipeline the same day — a paper form that never gets entered is a student who never gets invoiced.
3. Add them to the class roll and the term invoice run.
4. Send the welcome message: [FILL IN — paste your welcome text here so everyone sends the same one].
5. Uniform/merch order if applicable: [FILL IN process].

**Medical notes travel with the roll.** Teachers must know about the asthmatic kid in their class before the class, not during an attack.` },

{ id:'a-pay', sec:'sop', title:'Taking payments & chasing late fees', body:
`## How families pay
[FILL IN — bank transfer / card / cash rules, account details live in the Vault, invoice timing e.g. "invoiced at the start of each term, due by week 2".]

## The chase sequence (be friendly, be consistent)
1. **Due date passes:** wait 3 days — life happens.
2. **Day 4:** friendly text — "Hey! Just a nudge that Xʼs term fees are outstanding — let me know if you need a payment plan 💕"
3. **Day 10:** phone call. Offer a payment plan; a paying-slowly family is better than a gone family.
4. **Day 21:** student pauses classes until sorted. This is a Paiige-only decision — teachers never discuss money at the door.

**Golden rule:** money conversations happen privately with Paiige, never in front of the child or other parents.` },

{ id:'a-cancel', sec:'sop', title:'Class cancellation / teacher sick', body:
`## Teacher can't make it
1. Teacher tells Paiige the moment they know — 6am is better than 3pm.
2. Paiige tries the cover list (Staff section) in order.
3. No cover found → cancel by [FILL IN cutoff, e.g. 2pm] via [FILL IN channel — group chat/SMS/socials] with the make-up plan.

## Make-up policy
[FILL IN — e.g. "cancelled classes are made up in the same term or credited to next term". Families must always be told which one is happening.]

## Weather / venue closure
[FILL IN — who decides, by when, and the exact wording template for the announcement.]` },

{ id:'a-complaints', sec:'sop', title:'Complaints & difficult conversations', body:
`Complaints are gold — a family that complains is a family that hasn't left yet.

1. **Listen fully.** Don't defend, don't interrupt. Take notes.
2. Say: "Thank you for telling me — leave it with me and I'll come back to you by [day]."
3. Anything involving fees, staff conduct or another family goes to **Paiige only** — teachers never freelance an answer.
4. Paiige responds within **48 hours**, even if it's just "still looking into it."
5. Log every complaint and outcome in an article or note — patterns matter (three complaints about the same thing = a systems problem, not a people problem).

**Never** discuss one family's issue with another family. Small-community gossip closes studios.` },

{ id:'a-incident', sec:'sop', title:'Incident, injury & first aid', body:
`## Injury during class
1. Stop the class. The teacher stays with the injured student; a senior student or second adult manages the room.
2. First aid kit: [FILL IN location]. Ice for sprains/bumps; nothing stronger than basic first aid — we are not doctors.
3. **Head knocks, suspected breaks, breathing trouble → call 000 first**, parents second. When in doubt, call.
4. Phone the parent for anything beyond a trivial bump, even if the student says they're fine.
5. Same day: write an **incident report** — what happened, when, who saw it, what we did. Send to Paiige. This is non-negotiable; it protects the student, the teacher and the business.

## Uncollected child
Two staff (or teacher + another parent) stay — **never one adult alone with one child**. Work the contact list on the enrolment form. Still nobody after 30 minutes of calls → phone [FILL IN — police non-emergency 131 444 in QLD] for advice.

## Emergency contacts
Ambulance/Fire/Police: **000** · Poisons Info: **13 11 26** · Nearest hospital: [FILL IN]` },

{ id:'a-trial', sec:'sop', title:'Trial classes & walk-ins', body:
`A trial is a sales moment — the goal is that the kid leaves buzzing and the parent leaves informed.

1. Walk-in or DM enquiry → get them booked into a specific class, not "come whenever."
2. Before they join in: quick **trial form** (name, contact, emergency contact, medical). No form, no participation.
3. Teacher introduces them to the group, pairs them with a friendly buddy.
4. After class, the teacher tells the parent one **specific** positive ("She picked up the second combo fast").
5. Same evening: follow-up message with the enrolment link/price. Speed matters — enrol them while the kid is still dancing in the kitchen.
6. Log the trial in the OS pipeline with the outcome.

Trial pricing: [FILL IN — free first class? $X? one trial per person?]` },

// ------------------- STAFF -------------------
{ id:'a-onboard', sec:'staff', title:'New staff onboarding checklist', body:
`Work through this top to bottom for every new teacher/helper. Don't skip — day-one corners cut become month-six problems.

## Before they start
- [ ] Signed agreement/contract: [FILL IN where the template lives]
- [ ] **Blue Card** sighted and verified (working with children — legally required in QLD, no card = cannot start). Record number + expiry in the Vault.
- [ ] Bank + super + TFN details collected for payroll
- [ ] Added to the staff group chat
- [ ] OS login created (see "Getting set up with logins")

## Week one
- [ ] Studio tour: first aid kit, exits, alarm, this Brain app
- [ ] They read: Code of conduct, Running a class, Incident SOP — and confirm in the group chat
- [ ] Shadow one class before running one
- [ ] Intro post on socials (with their permission)

## First month
- [ ] Casual check-in chat with Paiige: what's confusing, what's missing from the Brain?` },

{ id:'a-conduct', sec:'staff', title:'Code of conduct & expectations', body:
`Simple version: **we are the adults in the room, and parents are trusting us with their kids.**

- Arrive 15 minutes before your class. Twice late without notice = conversation with Paiige.
- Phones away while teaching (music/filming excepted).
- Positive coaching: correct the movement, never mock the kid. "Try it like this" beats "that's wrong."
- **Never one adult alone with one child** — keep doors open, stay visible.
- No physical adjustments without asking the student first ("Can I move your arm?").
- Social media: don't post students without checked photo permission; don't friend/follow students under 18 from personal accounts; keep all student contact in official channels with parents included.
- Alcohol/vaping/smoking: never at the studio or events in PR Urban gear.
- Concerns about a child's welfare → straight to Paiige, same day. When it's serious, we have a legal duty of care.` },

{ id:'a-logins', sec:'staff', title:'Getting set up with logins', body:
`## What staff get
- **PR Urban OS** (pr-urban-os.vercel.app): their own email + password login, created by Paiige. Used for [FILL IN — rolls/pipeline/timetable as relevant].
- **This Brain app**: Paiige shares the Brain sync code — save the link to your home screen and paste the code once.
- **Group chat**: added on day one.

## What staff do NOT get
- The finance or calendar app codes (household apps — private).
- Paiige's own logins, ever. Everyone uses their own.

## Password resets
Forgot your OS password → tell Paiige, she resets it from the admin dashboard and gives you a temporary one **verbally** (never in writing). Change it after first login.

## When someone leaves
Paiige deletes their OS user (access dies instantly), removes them from the group chat, and rotates the Brain sync code if needed: Sync tab → new code from Paiige.` },

{ id:'a-bluecard', sec:'staff', title:'Working with children — the essentials (QLD)', body:
`## Blue Card
- Every teacher, helper and regular volunteer needs a valid **Blue Card** (QLD Working with Children Check) **before** starting — this is the law, not a preference.
- Apply/renew at qld.gov.au/bluecard. Free for volunteers.
- Paiige records card numbers + expiry dates in the Vault and diarises renewals in the calendar.

## Day-to-day rules (memorise these)
- Two-adult rule wherever possible; never alone one-on-one behind closed doors.
- Toilets: young kids go with a parent or in pairs, staff wait outside.
- Photos only on studio devices/accounts and only of kids with photo permission ticked.
- Physical contact: minimal, purposeful (safety/technique), always asked-first.
- If a child discloses harm: listen, don't promise secrecy, don't investigate — write down their words and tell Paiige **immediately**.

Paiige's escalation duty: reports go to [FILL IN — Child Safety after-hours 1800 177 135 / police 000 if immediate danger].` },

{ id:'a-payroll', sec:'staff', title:'Payroll & timesheets', body:
`[FILL IN this whole article with your real arrangement — this template is a best-practice starting point.]

- Pay cycle: fortnightly, aligned with the household Friday cycle.
- Timesheets: staff log classes taught in [FILL IN — the OS / a shared sheet / group chat] by [FILL IN day/time].
- Rates: casual teaching rate $[FILL IN]/class or /hour; cover classes paid at the same rate.
- Super: paid quarterly to the fund on file.
- Questions about pay go to Paiige privately — never in the group chat.` },

// ------------------- VAULT -------------------
{ id:'a-links', sec:'vault', title:'Where everything lives', body:
`## The systems
- **PR Urban OS** — pr-urban-os.vercel.app — pipeline, students, business data. Own login each.
- **PR Urban Brain** (this app) — prurban.github.io/brain — every SOP and playbook.
- **Socials** — [FILL IN handles: Instagram / TikTok / Facebook]
- **Email** — [FILL IN business email]
- **Music** — [FILL IN Spotify/Apple account used for class playlists]

## Paiige-only (not for general staff)
- Household finance & calendar apps (private codes)
- Supabase admin dashboard (controls all OS logins)
- GitHub account (hosts the apps)
- Firebase (the cloud the apps sync through)
- Banking

## Backups
Paiige downloads a backup of the OS data, the Brain, finance and calendar **monthly** (each app's Sync/Settings tab has a backup button) and keeps them in [FILL IN — OneDrive/Drive folder].` },

{ id:'a-contacts', sec:'vault', title:'Key contacts & suppliers', body:
`[FILL IN every line — placeholders below are prompts, delete what doesn't apply.]

## People
- Owner: Paiige — [phone]
- Partner/second contact: Micky — [phone]
- Teachers: see Staff section / group chat

## The venue
- Landlord/venue manager: [name, phone, email]
- Rent: $[amount] per [week/month], due [when], paid via [how]
- Electrician / handyman used before: [name, phone]

## Services
- Insurance broker/company: [name, policy no., phone] — public liability + [what else]
- Music licence: OneMusic Australia account [number]
- Accountant/bookkeeper: [name, phone]
- Uniform/merch supplier: [name, contact, reorder lead time]
- Printing (flyers/banners): [supplier]

## Emergency
000 emergencies · 131 444 police non-emergency (QLD) · 13 11 26 poisons · Nearest hospital: [FILL IN]` },

{ id:'a-terms', sec:'vault', title:'Term dates, timetable & pricing', body:
`Keep this the **one true copy** — when it changes here, it's changed everywhere. QLD school term dates: education.qld.gov.au.

## This year's terms
[FILL IN — Term 1: … · Term 2: … · Term 3: … · Term 4: …]

## Timetable
[FILL IN — day / time / class / teacher / room. Example:
- Monday 4:00pm — Juniors Hip Hop — Paiige
- Monday 5:00pm — Teens Commercial — …]

## Pricing
[FILL IN —
- Per class casual: $
- Term fee (1 class/week): $
- Sibling/multi-class discount:
- Trial class:
- Costume/comp fees: ]

## Refund & credit policy
[FILL IN — the exact sentences families are told. Consistency here prevents 90% of fee arguments.]` },

{ id:'a-compliance', sec:'vault', title:'Insurance, music licensing & compliance', body:
`The boring article that saves the business. Check dates every January.

## Must stay current
- **Public liability insurance** — dance studios generally need $10–20M cover. Insurer: [FILL IN], renewal: [FILL IN date]. Certificate saved in: [FILL IN].
- **Music licence** — playing recorded music in classes/performances needs a **OneMusic Australia** licence (onemusic.com.au). Account: [FILL IN]. Renewal: [FILL IN].
- **Blue Cards** — every staff member, tracked in the Vault, renewed before expiry.
- **ABN & business registration** — ABN: [FILL IN]. Business name renewal date: [FILL IN].
- **First aid** — at least [FILL IN who] holds a current first aid certificate (renew every 3 years, CPR yearly).

## Tax basics
[FILL IN with accountant's advice — GST registered? BAS quarterly? Where receipts go.]` },

// ------------------- MARKETING -------------------
{ id:'a-brand', sec:'mkt', title:'Brand voice & look', body:
`## Who we are online
PR Urban Dance sounds like a hyped, warm big sister — never corporate, never desperate.

- **Energy:** exclamation marks yes, ALL CAPS sparingly, emojis that match the brand [FILL IN your go-to emojis].
- **We say:** "our crew", "fam", "let's go", student first names (with permission).
- **We don't say:** anything negative about other studios, anything about a family's fees or drama, "cheap" (we say "great value").
- **Colours/fonts:** pink [FILL IN exact hex if known] on black, same as the OS and this app. Logo files live in: [FILL IN].

## Photo/video rules
Only students with the photo permission box ticked. Check before every post — the roll shows who's cleared. Faces of anyone else's kids in the background: crop or don't post.` },

{ id:'a-posting', sec:'mkt', title:'Weekly posting routine', body:
`Consistency beats brilliance. This routine takes ~45 minutes a week, batched.

## The weekly skeleton
- **Mon** — class clip from last week (15–30s, hook in first 2 seconds)
- **Wed** — behind-the-scenes / teacher moment / studio life story
- **Fri** — hype for the week ahead: what's on, spots left, shout-outs
- **Stories** — every class day: quick candid from the room

## Batch it
Film everything on class days; caption and schedule in one sitting on [FILL IN day]. Scheduler: [FILL IN — Meta Business Suite is free].

## Every post checklist
1. Photo-permission checked for every visible kid
2. One clear call to action (link in bio / DM us "TRIAL")
3. Location tag + 3–5 local hashtags [FILL IN your set, e.g. #brisbanedance]` },

{ id:'a-content', sec:'mkt', title:'Content ideas bank', body:
`Steal from this list whenever the well is dry. Add ideas as they come — future-you will thank you.

- Before/after: week 1 vs concert week of the same combo
- "Things our juniors said this week" (anonymous, wholesome)
- Teacher takeover day in stories
- 60-second tutorial: one move, broken down
- Student spotlight (permission + parent heads-up first)
- Costume sneak peeks in the lead-up to concerts
- Timelapse of the studio filling up before class
- FAQ posts: "Do I need dance experience? No — here's what week one looks like"
- Poll stickers: which song should the seniors dance to next?
- Throwbacks: first-ever class photo vs now
- Parents' corner: what to pack, how to do a slick bun in 90 seconds
- Local shout-outs: schools our students come from, local events we're at` },

{ id:'a-campaign', sec:'mkt', title:'Enrolment campaign playbook (term launch)', body:
`Run this in the **3 weeks before each term starts**. The goal: fill classes before week 1, because families who start in week 1 stay all term.

## Week −3: warm up
- Announce the term dates + timetable (post + stories + group chat)
- Early-bird offer if using one: [FILL IN e.g. "$X off if enrolled by …"]
- Personally message every family from last term who hasn't re-enrolled: "We've saved X's spot — want it?"

## Week −2: proof
- Post the best 3 clips from last term
- Student/parent testimonial post: [FILL IN 2–3 quotes you have permission to use]
- Trial-class push: "DM us TRIAL and we'll sort you a free/[$] first class"

## Week −1: urgency (real, not fake)
- "X spots left in Juniors" — only if true
- Final call post + stories countdown
- Confirm every trial booking personally the day before

## Week 1
- Welcome post for new families · photos from first classes (permission!) · follow up every trial that didn't convert within 48 hours.

Track every enquiry in the OS pipeline — an enquiry not written down is an enrolment lost.` },

{ id:'a-dms', sec:'mkt', title:'Handling DMs & enquiries', body:
`**Speed wins.** Reply to every enquiry within [FILL IN — aim: 2 hours, max: same day]. People message three studios and go with whoever answers.

## The flow
1. Warm hello, use their name if visible.
2. Answer the actual question in the first message — don't make them ask twice.
3. Always end with a next step: "Want me to book [child] in for a trial this [day]?"
4. Booked → log in OS pipeline → confirm the day before.
5. Ghosted after interest? One friendly bump 3 days later, then leave it.

## Copy-paste answers
- **Prices:** [FILL IN one clean paragraph]
- **Ages/levels:** [FILL IN]
- **Trial:** [FILL IN]
- **Timetable:** link or screenshot: [FILL IN]

Keep these three answers updated here so everyone gives identical info.` },
];

// ---------- state ----------
let DATA = null;
let currentSec = 'all';
let currentArt = null;   // article id open in reader
let editingId = null;    // article id in editor, null = new

function ensureDefaults(d) {
  if (!d || typeof d !== 'object') d = {};
  if (!Array.isArray(d.articles)) d.articles = [];
  if (!d.updatedAt) d.updatedAt = 0;
  return d;
}
function seedData() {
  return { articles: SEED_ARTICLES.map(a => ({ ...a, updatedAt: 1 })), updatedAt: 0 };
}

// ---------- sync engine (same pattern as finance/calendar web) ----------
const getSyncUrl = () => localStorage.getItem(SYNC_KEY) || '';
const setSyncUrl = u => localStorage.setItem(SYNC_KEY, u);
let syncTimer = null;

function setStatus(msg, ok) {
  const el = document.getElementById('sync-status');
  el.textContent = msg;
  el.style.color = ok ? '#7bd88f' : '#999';
}
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
}
function cacheLocal() { try { localStorage.setItem(CACHE_KEY, JSON.stringify(DATA)); } catch (e) {} }

async function pullFromCloud(silent) {
  const url = getSyncUrl(); if (!url) return false;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const remote = ensureDefaults(await res.json());
    if (!DATA || (remote.updatedAt || 0) > (DATA.updatedAt || 0)) {
      DATA = remote; cacheLocal(); renderAll();
    }
    setStatus('Synced ✓  (' + new Date().toLocaleTimeString() + ')', true);
    return true;
  } catch (e) {
    if (!silent) setStatus('Sync failed — check connection', false);
    return false;
  }
}
async function pushToCloud() {
  const url = getSyncUrl(); if (!url) return;
  DATA.updatedAt = Date.now(); cacheLocal();
  try {
    const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DATA) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    setStatus('Synced ✓  (' + new Date().toLocaleTimeString() + ')', true);
  } catch (e) {
    setStatus('Save failed — will retry when online', false);
    toast('Save failed — check internet');
  }
}
function save() { pushToCloud(); }

// ---------- markdown-lite ----------
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function renderBody(src) {
  const lines = esc(src).split('\n');
  let html = '', list = null; // 'ul' | 'ol'
  const closeList = () => { if (list) { html += '</' + list + '>'; list = null; } };
  const inline = s => s
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[FILL IN([^\]]*)\]/g, '<span class="todo">[FILL IN$1]</span>');
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^## /.test(line)) { closeList(); html += '<h3>' + inline(line.slice(3)) + '</h3>'; }
    else if (/^- /.test(line.trim())) { if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; } html += '<li>' + inline(line.trim().slice(2)) + '</li>'; }
    else if (/^\d+\. /.test(line.trim())) { if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; } html += '<li>' + inline(line.trim().replace(/^\d+\. /, '')) + '</li>'; }
    else if (line.trim() === '') { closeList(); }
    else { closeList(); html += '<p>' + inline(line) + '</p>'; }
  }
  closeList();
  return html;
}

// ---------- rendering ----------
function switchTab(name) {
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.getElementById('new-art-btn').style.display = (name === 'home') ? 'block' : 'none';
}

function renderChips() {
  const wrap = document.getElementById('sec-chips');
  const all = [{ id: 'all', name: 'All', color: '#bbb' }, ...SECTIONS];
  wrap.innerHTML = all.map(s =>
    `<button class="chip${currentSec === s.id ? ' active' : ''}" data-sec="${s.id}" style="${currentSec === s.id ? 'background:' + s.color : ''}">${s.name}</button>`
  ).join('');
  wrap.querySelectorAll('.chip').forEach(c => c.onclick = () => { currentSec = c.dataset.sec; renderList(); renderChips(); });
}

function renderList() {
  const q = document.getElementById('search').value.trim().toLowerCase();
  const wrap = document.getElementById('art-list');
  let arts = DATA.articles.slice();
  if (currentSec !== 'all') arts = arts.filter(a => a.sec === currentSec);
  if (q) arts = arts.filter(a => (a.title + ' ' + a.body).toLowerCase().includes(q));
  if (!arts.length) { wrap.innerHTML = '<p style="color:#999;padding:20px 4px">Nothing found' + (q ? ' for “' + esc(q) + '”' : '') + '.</p>'; return; }
  let html = '';
  for (const s of SECTIONS) {
    const group = arts.filter(a => a.sec === s.id);
    if (!group.length) continue;
    if (currentSec === 'all') html += `<div class="sec-head" style="color:${s.color}">${s.name}</div>`;
    for (const a of group) {
      const prev = a.body.replace(/[#*\-\[\]]/g, '').replace(/\s+/g, ' ').slice(0, 90);
      html += `<div class="art-card" data-id="${a.id}" style="border-left-color:${s.color}">
        <span class="sec-tag" style="background:${s.color}">${s.name}</span>
        <h3>${esc(a.title)}</h3><div class="prev">${esc(prev)}…</div></div>`;
    }
  }
  wrap.innerHTML = html;
  wrap.querySelectorAll('.art-card').forEach(c => c.onclick = () => openArticle(c.dataset.id));
}

function openArticle(id) {
  const a = DATA.articles.find(x => x.id === id); if (!a) return;
  currentArt = id;
  document.getElementById('r-title').textContent = a.title;
  document.getElementById('r-body').innerHTML = renderBody(a.body);
  document.getElementById('r-meta').textContent = secOf(a.sec).name + ' · last edited ' + (a.updatedAt > 1 ? new Date(a.updatedAt).toLocaleDateString() : 'never (original draft)');
  switchTab('reader');
  window.scrollTo(0, 0);
}

function openEditor(id) {
  editingId = id;
  const sel = document.getElementById('ed-sec');
  sel.innerHTML = SECTIONS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  const a = id ? DATA.articles.find(x => x.id === id) : null;
  document.getElementById('ed-title').value = a ? a.title : '';
  sel.value = a ? a.sec : (currentSec !== 'all' ? currentSec : 'sop');
  document.getElementById('ed-body').value = a ? a.body : '';
  document.getElementById('ed-delete').style.display = a ? 'block' : 'none';
  const del = document.getElementById('ed-delete');
  del.textContent = 'Delete'; delete del.dataset.armed;
  switchTab('editor');
  window.scrollTo(0, 0);
}

function renderAll() { renderChips(); renderList(); }

// ---------- events ----------
document.querySelectorAll('.tab-btn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
document.getElementById('search').addEventListener('input', renderList);
document.getElementById('new-art-btn').onclick = () => openEditor(null);
document.getElementById('back-btn').onclick = () => switchTab('home');
document.getElementById('edit-btn').onclick = () => openEditor(currentArt);
document.getElementById('ed-cancel').onclick = () => switchTab(editingId ? 'reader' : 'home');

document.getElementById('ed-save').onclick = () => {
  const title = document.getElementById('ed-title').value.trim();
  const body = document.getElementById('ed-body').value.trim();
  if (!title) { toast('Give it a title'); return; }
  const sec = document.getElementById('ed-sec').value;
  if (editingId) {
    const a = DATA.articles.find(x => x.id === editingId);
    a.title = title; a.body = body; a.sec = sec; a.updatedAt = Date.now();
  } else {
    editingId = 'a-' + Date.now().toString(36);
    DATA.articles.push({ id: editingId, sec, title, body, updatedAt: Date.now() });
  }
  save(); renderAll(); openArticle(editingId);
  toast('Saved');
};

document.getElementById('ed-delete').onclick = function () {
  if (this.dataset.armed === '1') {
    DATA.articles = DATA.articles.filter(x => x.id !== editingId);
    save(); renderAll(); switchTab('home'); toast('Deleted');
  } else {
    this.dataset.armed = '1'; this.textContent = 'Tap again to delete';
    setTimeout(() => { this.textContent = 'Delete'; delete this.dataset.armed; }, 2500);
  }
};

document.getElementById('save-sync-btn').onclick = async () => {
  const url = document.getElementById('sync-url').value.trim();
  if (!/^https:\/\/.+\.json$/.test(url)) { toast('That doesn’t look like a sync code'); return; }
  setSyncUrl(url);
  setStatus('Connecting…', false);
  // If cloud is empty, push the seed; otherwise adopt cloud.
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const remote = res.ok ? await res.json() : null;
    if (remote && Array.isArray(remote.articles) && remote.articles.length) {
      DATA = ensureDefaults(remote); cacheLocal();
    } else {
      DATA = seedData(); await pushToCloud();
    }
    document.getElementById('setup-banner').style.display = 'none';
    renderAll(); switchTab('home');
    setStatus('Synced ✓', true);
    toast('Connected!');
    startPolling();
  } catch (e) { setStatus('Could not connect — check the code', false); }
};

document.getElementById('backup-btn').onclick = () => {
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pr-urban-brain-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
};

function startPolling() {
  if (syncTimer) clearInterval(syncTimer);
  syncTimer = setInterval(() => pullFromCloud(true), 60000);
}
window.addEventListener('focus', () => pullFromCloud(true));

// ---------- boot ----------
(function boot() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) { try { DATA = ensureDefaults(JSON.parse(cached)); } catch (e) {} }
  const url = getSyncUrl();
  document.getElementById('sync-url').value = url;
  if (!url) {
    DATA = DATA || seedData();
    document.getElementById('setup-banner').style.display = 'block';
    renderAll(); switchTab('sync');
  } else {
    DATA = DATA || seedData();
    renderAll(); switchTab('home');
    pullFromCloud(false).then(() => renderAll());
    startPolling();
  }
})();
