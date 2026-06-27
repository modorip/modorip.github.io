// 설계 화면용 데이터 (docs/02-아키텍처·06-백엔드의 요약 뷰). 원천 문서는 docs.
export const PRIN = [
  ['🔐','<b>OAuth 전용 로그인</b> — Apple · Google · Kakao 3종만. 비밀번호/이메일 가입 없음 → <code>users</code>에 password 없음. 세션은 프로바이더 재교환 + access JWT(서버 refresh 토큰 없음, 필요 시 <code>token_version</code> 일괄 무효화).'],
  ['🧩','<b>모듈러 모놀리스</b> — <code>com.modorip.server</code> 컨텍스트별 모듈. 협력은 도메인 이벤트 + ID 참조.'],
  ['🔗','<b>물리 FK는 컨텍스트 내부만</b>. 컨텍스트 간은 <code>*_id</code> 문자열 ID 참조(논리 분리).'],
  ['📡','<b>KTO 자원: 실시간 호출 + read-through 캐시</b> — 자원은 <code>place_snapshot</code>에 read-through 캐시(미스 시 호출, KTO 원천). <code>regions/categories</code>는 시드. 벌크 동기화 금지(ADR-0011).'],
  ['📍','<b>GPS 좌표 미저장</b> — <code>discoveries</code>에 좌표 없음. 지오펜스는 온디바이스(ADR-0010).'],
  ['🚩','<b>신고·이상감지</b> — 사용자 신고(<code>reports</code>, 다형) + 자동 이상감지(<code>abuse_flags</code>: 발견 폭주·이동 불가 속도, 공개 좌표만). 제재는 <code>users.status</code>.'],
  ['🛡️','<b>운영자 콘솔(Admin)</b> — 신고·이상감지 검토·처리는 내부 화면(소비자 앱과 분리). OAuth + <code>users.role=admin</code>, 처리는 <code>moderation_actions</code> audit.'],
  ['🔢','<b>카운터는 결과적 일관성</b> — <code>place_counters</code>·<code>saved_count</code>·<code>cheer_count</code>는 이벤트/집계.'],
  ['🆔','PK는 <code>uuid</code>. 발견·담기·응원은 <code>unique</code>로 멱등.'],
];
export const CTX = [
  ['Identity','#6541f2','계정·인증'],['Collection','#0066ff','수집·도감 · Core'],['Achievement','#d17600','칭호 · Core'],
  ['Course','#00aeae','코스·프리셋'],['Plaza','#d331b8','광장·소셜'],['Moderation','#e5484d','신고·제재'],
  ['Catalog','#009632','자원 카탈로그 · 시드/캐시'],['Recommendation','#9aa0a8','무상태'],['Media','#9aa0a8','스토리지'],
];
export const RELS = [
  ['users → discoveries / presets / companions','FK','fk','N:1'],
  ['users → reports / abuse_flags / moderation_actions','FK','fk','N:1'],
  ['preset_saves (users ↔ presets)','junction','fk','N:M — 담기'],
  ['feed_cheers (users ↔ feed_items)','junction','fk','N:M — 응원'],
  ['companion_members (users ↔ companions)','junction','fk','N:M — 참여'],
  ['feed_comments → feed_items','FK','fk','N:1'],
  ['wishlist / account_titles / feed_items . user_id → users','ID 참조','id','컨텍스트 간(물리 FK 없음)'],
  ['regions / categories → discoveries','시드 참조','id','region_id·category_id'],
  ['place_snapshot → discoveries.place_id','read-through 캐시','id','캐시 미존재 가능 → FK 없음'],
  ['reports.target_id → FEED/PRESET/COMPANION/USER','다형 ID','id','target_type + target_id'],
  ['Collection → Achievement·Plaza·Moderation','PlaceDiscovered','ev','도메인 이벤트'],
  ['Achievement → Plaza','TitleEarned','ev','도메인 이벤트'],
  ['Course → presets.saved_count','PresetSaved/Unsaved','ev','집계 카운터'],
];
export const MAP = [
  ['Account','users','Identity'],['Discovery / PlaceCounter','discoveries / place_counters','Collection'],
  ['AccountTitles','account_titles','Achievement'],['Preset / PresetSave','presets / preset_saves','Course'],
  ['FeedItem / Cheer / Comment','feed_items / feed_cheers / feed_comments','Plaza'],
  ['Companion / CompanionMember','companions / companion_members','Plaza'],
  ['Report / AbuseFlag / ModerationAction','reports / abuse_flags / moderation_actions','Moderation'],
  ['Region / Category(시드) · PlaceSnapshot(캐시)','regions / categories / place_snapshot / region_category_counts','Catalog'],
];
export const EXT = [
  ['🗺️','<b>KTO 자원 원문·사진</b>: 실시간 호출(KtoTourClient ACL). <code>place_snapshot</code>은 read-through 캐시. 벌크 동기화 금지.'],
  ['📍','<b>사용자 GPS 좌표</b>: 저장·수신 안 함(온디바이스, 서버엔 placeId만).'],
  ['🖼️','<b>사진 바이너리</b>: 오브젝트 스토리지(Media). DB엔 URL만.'],
  ['🏆','<b>혼잡도·다양성 지표</b>: TatsCnctrRate / AreaTarDiv 실시간(상대 비교).'],
];
export const MERMAID_SIMPLE = `flowchart LR
  users["users<br/>사용자"]
  discoveries["discoveries<br/>발견 기록"]
  place_counters["place_counters<br/>발견자 수"]
  account_titles["account_titles<br/>칭호"]
  presets["presets<br/>프리셋(코스)"]
  feed_items["feed_items<br/>피드"]
  feed_comments["feed_comments<br/>댓글"]
  companions["companions<br/>동행"]
  reports["reports<br/>신고"]
  abuse_flags["abuse_flags<br/>이상감지"]
  moderation_actions["moderation_actions<br/>운영자 이력"]
  place_snapshot["place_snapshot<br/>자원(캐시)"]
  regions["regions<br/>광역(시드)"]
  categories["categories<br/>카테고리(시드)"]
  region_category_counts["region_category_counts<br/>매트릭스 카운트"]
  users -->|"1:N"| discoveries
  users -->|"1:N"| presets
  users -->|"1:N"| companions
  users -->|"1:N"| feed_items
  users -->|"1:N"| account_titles
  users -->|"1:N"| reports
  users -->|"1:N"| abuse_flags
  users -->|"1:N"| moderation_actions
  users <-->|"N:M 담기"| presets
  users <-->|"N:M 응원"| feed_items
  users <-->|"N:M 참여"| companions
  users <-->|"N:M 가고싶다"| place_snapshot
  feed_items -->|"1:N"| feed_comments
  discoveries -.->|"1:1 파생"| feed_items
  discoveries -->|"N:1"| place_snapshot
  discoveries -->|"N:1"| place_counters
  regions -->|"1:N"| place_snapshot
  categories -->|"1:N"| place_snapshot
  regions -->|"1:N"| region_category_counts
  classDef identity fill:#efeaff,stroke:#6541f2,color:#171719;
  classDef collection fill:#e7f0ff,stroke:#0066ff,color:#171719;
  classDef achievement fill:#fdf1e3,stroke:#d17600,color:#171719;
  classDef course fill:#e3f6f6,stroke:#00aeae,color:#171719;
  classDef plaza fill:#fcecf8,stroke:#d331b8,color:#171719;
  classDef moderation fill:#fdecec,stroke:#e5484d,color:#171719;
  classDef catalog fill:#e9f7ee,stroke:#009632,color:#171719;
  class users identity;
  class discoveries,place_counters collection;
  class account_titles achievement;
  class presets course;
  class feed_items,feed_comments,companions plaza;
  class reports,abuse_flags,moderation_actions moderation;
  class place_snapshot,regions,categories,region_category_counts catalog;`;
export const MERMAID_DETAIL = `erDiagram
  users ||--o{ discoveries : ""
  users ||--o{ presets : ""
  users ||--o{ companions : ""
  users ||--o{ reports : "신고자"
  users ||--o{ abuse_flags : "대상"
  users ||--o{ moderation_actions : "운영자"
  users ||--o{ preset_saves : ""
  presets ||--o{ preset_saves : ""
  feed_items ||--o{ feed_cheers : ""
  feed_items ||--o{ feed_comments : ""
  companions ||--o{ companion_members : ""
  users ||..o{ wishlist : ""
  users ||..o{ account_titles : ""
  users ||..o{ feed_items : ""
  regions ||..o{ discoveries : "지역"
  categories ||..o{ discoveries : "계열"
  place_snapshot ||..o{ discoveries : "자원(캐시)"
  users { uuid id PK  text provider "apple|google|kakao"  text status  text role  int token_version }
  discoveries { uuid id PK  uuid user_id FK  text place_id "KTO"  text mode "light|deep" }
  place_counters { text place_id PK  int total_count }
  wishlist { uuid user_id PK  text place_id PK }
  account_titles { uuid user_id PK  text title_id PK  bool earned }
  presets { uuid id PK  uuid author_id FK  int saved_count }
  preset_saves { uuid user_id PK  uuid preset_id PK }
  feed_items { uuid id PK  uuid user_id  int cheer_count }
  feed_cheers { uuid user_id PK  uuid feed_id PK }
  feed_comments { uuid id PK  uuid feed_id FK }
  companions { uuid id PK  uuid host_user_id FK  text type }
  companion_members { uuid companion_id PK  uuid user_id PK }
  reports { uuid id PK  uuid reporter_id FK  text target_type  text target_id }
  abuse_flags { uuid id PK  uuid user_id FK  text kind }
  moderation_actions { uuid id PK  uuid actor_id FK  text action }
  regions { text region_id PK  text area_cd  text name }
  categories { text id PK  text group  text content_type_id }
  place_snapshot { text content_id PK "KTO"  text name  timestamptz fetched_at }
  region_category_counts { text region_id PK  text content_type PK  int total_count }`;
export const DECISIONS = [
  {g:'🎯 공모전 제출 전략', items:[
    {id:1,p:'red',t:'제출 형태',done:true,a:'앱만 (Flutter). 웹은 추후 landing page(GitHub Pages).'},
    {id:2,p:'red',t:'앱 스토어',done:true,a:'Google Play + App Store.'},
    {id:3,p:'orange',t:'지역특화 가점',done:true,a:'해당 없음(전국 도감).'},
    {id:4,p:'red',t:'팀 정보',done:true,a:'MILLO(밀로) · 모두립 · 박경덕(대표), 이수아.'},
    {id:5,p:'yellow',t:'교육·컨설팅',done:false,a:'미정(선택). 권장: 7~8월 컨설팅.'},
    {id:6,p:'yellow',t:'Start-up NEST',done:true,a:'해당 없음.'},
  ]},
  {g:'🏗️ 기술·아키텍처', items:[
    {id:7,p:'red',t:'KTO 데이터 전략',done:true,a:'실시간 호출 + read-through 캐시(벌크 동기화 금지). ADR-0011.'},
    {id:8,p:'orange',t:'서버 호스팅',done:true,a:'우선 Azure.'},
    {id:9,p:'orange',t:'위치정보 사전검토',done:true,a:'현 설계로 진행(서버 미전송→비신고). 출시 직전 lbsc.kr 선택.'},
    {id:10,p:'orange',t:'KTO 명칭 표기',done:true,a:'"한국관광공사/KTO" 전체 제거.'},
  ]},
  {g:'🔧 운영·repo', items:[
    {id:11,p:'red',t:'repo remote 연결',done:true,a:'확인 완료.'},
    {id:12,p:'red',t:'serviceKey 발급',done:true,a:'발급 완료(개발계정). 다음: 호출 테스트→연동→운영계정.'},
    {id:13,p:'yellow',t:'landing repo',done:true,a:'요청 시.'},
    {id:14,p:'yellow',t:'docs 자동 동기화 훅',done:true,a:'수동 유지.'},
  ]},
];
