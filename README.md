# Persona Watch

*[한국어](#persona-watch) | [English](#persona-watch-english)*

브라우저에서 바로 실행되는 단일 HTML 파일 기반 페르소나 시뮬레이터입니다. 별도 설치나 서버 없이 파일을 다운로드해 **Chrome/Safari/Samsung Internet** 등으로 직접 열면 바로 플레이할 수 있습니다.

> ⚠️ 카카오톡·메신저 내장 브라우저는 스크립트를 차단합니다. 반드시 파일을 저장한 뒤 일반 브라우저로 열어주세요.

## 파일 구성

| 파일 | 설명 |
|---|---|
| `persona-watch-v39.html` | **1인칭 R18 생존형 시뮬레이터.** 플레이어 캐릭터를 만들어 리조트 안에서 직접 행동하며, 인터랙티브 스토리 아크·1인칭 이야기 로그(당신에게 직접 벌어지는 일 중심)로 진행됩니다. 계속 개발 중인 메인 버전입니다. |
| `persona-watch-observer.html` | **관찰판.** 아바타 커스터마이징·날씨·지속효과·언어 전환 등 v39의 기능을 그대로 공유하는 파생 버전입니다. 다만 메인 스토리 아크는 진행하지 않고(인물 개인 서사보다 NPC 군상극 관찰에 초점), 전체 로그가 기본으로 열리며, 이벤트·관전 확률과 자동 기절이 기본으로 더 높게 설정되어 있습니다. |

두 파일은 저장 데이터와 설정을 별도로 관리하므로 서로 간섭하지 않습니다.

## 주요 기능 (v39 기준)

- **관찰 등급 0~3단계**: 전체이용가부터 R18까지, 등급에 따라 노출·상호작용 콘텐츠가 단계적으로 열립니다.
- **캐릭터 커스터마이징**: 성격(아키타입) 슬라이더, 신체 민감도, 성별/성기 타입, 의상(47종)·헤어스타일(18종)·속옷(13종) 외에 피부톤·머리색·눈동자색을 고르는 **도트 그래픽 아바타**를 실시간 미리보기로 제작할 수 있습니다. `avatar_assets/` 폴더에 규격에 맞는 투명 PNG를 넣으면 도트 렌더러 대신 그 이미지를 겹쳐 그리는 레이어 시스템도 지원합니다(파일이 없으면 자동으로 기존 도트 렌더러를 사용).
- **인터랙티브 스토리 아크**: 전망대(세라)·마트(도한)·농장(새로)·스트립클럽(리라) 등 고정 인물마다 독립된 다챕터 서사가 있으며, 관계 수치 임계값 + 해당 인물의 실제 장소를 방문해야 진행됩니다. 각 챕터마다 선택지가 있어 결말이 달라집니다.
- **일상 스크립트**: 큰 줄거리와 무관하게 스치는 소소한 하루의 순간들(습득물, 우연한 만남, 날씨 관련 소소한 사건 등)이 랜덤하게 삽입됩니다.
- **날씨 시스템**: 맑음/흐림/비/강풍/무더위/한파가 순환하며 각각 노출·피로·안정도 등에 실질적인 영향을 줍니다.
- **지속효과(상태) 시스템**: 특정 이벤트가 일회성으로 끝나지 않고 여러 턴에 걸쳐 주기적으로 효과를 일으키다 종료되는 상태(감기, 점액감염, 기생체 등)를 가집니다.
- **관계·H 시스템 (R18)**: 호감/애정/신뢰/긴장/욕망 스탯, 성기 타입에 따라 분기되는 전용 대사, 다양한 페티시 이벤트(수간·촉수·워터스포츠·구속·노출증 등, 설정에서 개별 토글), 다인 플레이, 강압/부탁/복종 등의 R18 성향.
- **일자리 시스템**: 마트·카페·식당·농장·헬스장·해변·스트립클럽·성인용품점 등에서 근무하며, 다수는 선택지에 따라 R18 분기가 있는 다단계 근무 미니게임입니다. 같은 일자리를 연속으로 하면 숙련도가 붙어 보수가 오르고(최대 +50%), 날씨에 따라 상점 물가도 오르내립니다.
- **질투·소문 / 성적 평판 (R18)**: 애정 깊은 인물이 H 세션을 목격하면 긴장이 쌓이다 대치 이벤트로 번지며(선택에 따라 다른 인물에게까지 파문), 별도로 누적되는 성적 평판 수치가 높아지면 낯선 인물이 소문을 듣고 먼저 다가오기도 합니다. 두 시스템 모두 평판·연인 여부·성격(대담함) 등 캐릭터 맥락에 따라 확률이 달라집니다.
- **폭동 모드 (R18, 설정에서 켜기)**: 활성화하면 주기적으로 몇 명이 발정해 플레이어를 쫓아오며, 따돌리지 못하면 붙잡혀 다인 H가 시작됩니다. 포획 확률은 추격자의 흥분도와 플레이어의 운동 스탯에 따라 달라지고, "도망친다" 버튼으로 탈출을 시도할 수 있습니다.
- **1인칭 이야기 로그 / 전체 로그 전환**: 우측 패널 헤더 버튼으로 "당신에게 직접 벌어지는 일만" 보여주는 이야기 모드와, 모든 인물의 행동을 기록하는 전체 로그를 언제든 전환할 수 있습니다.
- **저장/불러오기**: 브라우저 로컬 저장, 파일로 내보내기/가져오기 지원. 자동 저장 간격은 설정에서 조절합니다. 날씨나 폭동 모드 추격 상태처럼 턴 사이에 유지되는 진행 중인 상황도 함께 저장·복원됩니다.
- **시스템 설정 콘솔**: 툴바의 ⚙ 버튼에서 기절/절정/난입 반응, 각종 확률·배율, 신규 캐릭터 기본값, R18+ 페티시 요소 토글 등을 세밀하게 조정할 수 있습니다.
- **언어 전환 (한국어/English)**: 두 버전 모두 툴바에서 인터페이스 언어를 한국어/영어로 전환할 수 있습니다. 툴바·버튼·패널 라벨·설정 콘솔·퀘스트 설명 등 UI 전반이 번역되며, 선택은 브라우저에 저장됩니다. NPC 대사·이벤트·스토리 본문 등 서사 콘텐츠는 한국어로 고정되어 있습니다.

## 시작하기

1. 원하는 버전의 HTML 파일을 다운로드합니다.
2. 브라우저로 직접 엽니다 (더블클릭 또는 브라우저의 파일 열기).
3. 좌측에서 캐릭터를 만들거나, 우측 플레이어 패널에서 "1인칭으로 시작"을 눌러 컨트롤 캐릭터를 생성합니다.
4. 관찰 등급을 필요에 따라 조정한 뒤, 1턴 진행 또는 자동재생으로 시뮬레이션을 시작합니다.

이 프로젝트는 성인용(R18) 콘텐츠를 포함합니다. 성인 사용자만 이용해 주세요.

## 개발자를 위한 안내

- `persona-watch-v39.html`과 `persona-watch-observer.html`은 상태 모델·저장/불러오기·i18n(`tr()`, `I18N.ko`, `I18N.en`)·아바타 시스템 등 핵심 로직을 그대로 공유하는 두 개의 독립된 파일입니다. 한쪽 파일의 로직을 고치면 **다른 쪽 파일에도 동일하게 반영**해야 두 버전이 어긋나지 않습니다.
- 커밋 전에는 `node scripts/check-html-script-syntax.js persona-watch-v39.html persona-watch-observer.html`로 인라인 `<script>` 블록의 문법 오류를 확인하세요. 동일한 검사가 GitHub Actions(`.github/workflows/check.yml`)에서 push·PR마다 자동으로 실행됩니다.
- `avatar_assets/` 폴더는 선택적 PNG 레이어 모드용입니다. 폴더가 비어 있거나 규격에 맞는 파일이 없으면 자동으로 기존 도트 렌더러로 대체(fallback)되므로, 새 레이어를 추가할 때는 기존 파일명 규칙을 따라야 합니다.

---

<a id="persona-watch-english"></a>
# Persona Watch (English)

*[한국어](#persona-watch) | [English](#persona-watch-english)*

A persona life-simulator that runs entirely from a single HTML file in your browser. No install, no server — just download the file and open it directly in **Chrome/Safari/Samsung Internet**, etc.

> ⚠️ In-app browsers (KakaoTalk, other messenger apps) block scripts. Save the file first and open it in a regular browser.

## Files

| File | Description |
|---|---|
| `persona-watch-v39.html` | **First-person R18 survival simulator.** Create a player character and act directly within the resort, driven by interactive story arcs and a first-person story log (focused on what happens directly to you). This is the actively developed main version. |
| `persona-watch-observer.html` | **Observer board.** Shares v39's full feature set (avatars, weather, persistent status effects, language toggle, etc.), but skips the main story arcs (focused on watching the NPCs' ensemble drama rather than one character's personal narrative), opens in Full Log mode by default, and has higher default event/spectate probabilities plus auto-faint enabled. |

The two files keep separate save data and settings, so they never interfere with each other.

## Key Features (as of v39)

- **Content rating, 4 tiers (0–3)**: From All Ages to R18 — exposure and interaction content unlocks progressively by rating.
- **Character customization**: Personality (archetype) sliders, body sensitivity, gender/genital type, 47 outfits, 18 hairstyles, and 13 underwear options, plus a **pixel-art avatar** you build with skin tone, hair color, and eye color, previewed live. Also supports an optional PNG-layer rendering mode -- drop matching transparent PNGs into an `avatar_assets/` folder and the game automatically composites those instead of the built-in pixel renderer (falls back gracefully if files are missing).
- **Interactive story arcs**: Fixed characters (the lookout keeper, the mart owner, the farm girl, the strip-club dancer, etc.) each have an independent multi-chapter storyline that advances only once relationship thresholds are met *and* you're actually at that character's location. Every chapter has branching choices that change the outcome.
- **Everyday scripted moments**: Small slice-of-life events unrelated to the main plot (found items, chance encounters, minor weather-related happenings) are randomly sprinkled in.
- **Weather system**: Clear / Cloudy / Rain / Windy / Heatwave / Cold Snap cycle through and meaningfully affect exposure, fatigue, stability, and more.
- **Persistent status-effect system**: Certain events don't end in one shot — they leave a status (cold, slime infection, parasite, etc.) that keeps applying effects turn after turn until it runs its course.
- **Relationship & H system (R18)**: Liking / Affection / Trust / Tension / Desire stats, genital-type-specific dialogue branches, a range of fetish events (bestiality, tentacles, watersports, bondage, exhibitionism, etc. — each individually toggleable in settings), group play, and R18 dispositions (default / plea / force / submit).
- **Job system**: Work at the mart, cafe, dining hall, farm, gym, beach, strip club, adult shop, and more — many are multi-stage work minigames with R18 branches depending on your choices. Working the same job repeatedly builds a proficiency bonus (up to +50% pay), and shop prices shift a bit with the weather.
- **Jealousy/gossip & sexual reputation (R18)**: Characters who care about you may notice if they witness you in an H session, building tension that can escalate into a confrontation event (with consequences that ripple to others who care about them). Separately, a sexual reputation stat builds up from your activity, and once it's high enough, strangers may proposition you first, having heard the rumors. Both systems weigh reputation, relationship status, and personality (boldness) rather than using flat odds.
- **Riot Mode (R18, opt-in in settings)**: When enabled, characters periodically go into heat and chase you; if you can't shake them off, they catch you and start a group H session. Capture odds depend on the chasers' arousal and your athletics, and you can attempt to Flee.
- **First-person story log / full log toggle**: A header button on the right panel lets you switch anytime between Story mode (only what happens directly to you) and the Full Log (every character's actions recorded).
- **Save / load**: Local browser save plus export/import to file. Autosave interval is adjustable in settings. In-progress state that persists across turns, such as the current weather or an ongoing Riot Mode chase, is also saved and restored.
- **System settings console**: The ⚙ toolbar button gives fine-grained control over fainting/climax/interruption reactions, various probabilities and multipliers, new-character defaults, and individual R18+ fetish content toggles.
- **Language toggle (한국어/English)**: Both versions' toolbars let you switch the interface language between Korean and English. The toolbar, buttons, panel labels, settings console, quest descriptions, and the rest of the UI chrome are translated, and your choice is saved in the browser. NPC dialogue, events, and story text remain Korean-only.

## Getting Started

1. Download whichever version's HTML file you want.
2. Open it directly in your browser (double-click, or use your browser's "Open File").
3. Create a character from the left panel, or click "Start in First Person" in the right-hand player panel to create your control character.
4. Adjust the content rating as needed, then start the simulation with a single turn or auto-play.

This project contains adult (R18) content. For adult users only.

## Development

- `persona-watch-v39.html` and `persona-watch-observer.html` share the same core logic — state model, save/load, i18n (`tr()`, `I18N.ko`, `I18N.en`), avatar system, and so on — as two independent files. A logic fix in one file needs to be **applied identically to the other** to keep the two versions in sync.
- Before committing, run `node scripts/check-html-script-syntax.js persona-watch-v39.html persona-watch-observer.html` to catch syntax errors in the inline `<script>` blocks. The same check now runs automatically on every push/PR via GitHub Actions (`.github/workflows/check.yml`).
- The `avatar_assets/` folder is for the optional PNG-layer rendering mode. If the folder is empty or a file doesn't match the expected naming, it falls back to the built-in pixel renderer automatically — follow the existing file-naming convention when adding new layers.
