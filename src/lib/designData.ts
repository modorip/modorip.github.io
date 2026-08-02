// 설계 화면용 데이터 (docs/02-아키텍처·06-백엔드의 요약 뷰). 원천 문서는 docs.
//
// 행이 전부 위치 기반 배열(`p[0]`·`r[2]` 로 소비)이라 타입도 튜플로 둔다.
// 튜플은 interface 로 표현할 수 없어 type 별칭을 쓴다.

/**
 * 아이콘 + 설명 행. [0]=SEED 아이콘 컴포넌트명, [1]=<b>·<code> 가 박힌 HTML 문자열.
 * [1] 은 dangerouslySetInnerHTML 로 주입되므로 사용자 입력을 절대 섞지 마라.
 */
export type IconTextRow = readonly [icon: string, html: string];

/** 연관관계의 종류. database 화면의 REL_TONE·REL_LABEL 키와 일치해야 한다. */
export type RelationKind = 'fk' | 'ev' | 'id';

/** 바운디드 컨텍스트 뱃지. [1]은 컨텍스트 식별색(SEED 토큰 var()). */
export type ContextRow = readonly [name: string, color: string, desc: string];

export type RelationRow = readonly [
  relation: string,
  via: string,
  kind: RelationKind,
  cardinality: string,
];

/** 도메인 애그리거트 → 물리 테이블 → 소속 컨텍스트 */
export type MappingRow = readonly [aggregate: string, tables: string, context: string];

export const PRIN: readonly IconTextRow[] = [
  ['IconKeyholeShieldLine','<b>OAuth 전용 로그인</b> - Apple · Google · Kakao 3종만. 비밀번호/이메일 가입 없음 → <code>users</code>에 password 없음. 세션은 프로바이더 재교환 + access JWT(서버 refresh 토큰 없음, 필요 시 <code>token_version</code> 일괄 무효화).'],
  ['IconCircle4SquareLine','<b>모듈러 모놀리스</b> - <code>com.modorip.server</code> 컨텍스트별 모듈. 협력은 도메인 이벤트 + ID 참조.'],
  ['IconHashLine','<b>물리 FK는 컨텍스트 내부만</b>. 컨텍스트 간은 <code>*_id</code> 문자열 ID 참조(논리 분리).'],
  ['IconArrowCounterclockwiseCircularLine','<b>KTO 자원: 실시간 호출 + read-through 캐시</b> - 자원은 <code>place_snapshot</code>에 read-through 캐시(미스 시 호출, KTO 원천). <code>regions/categories</code>는 시드. 벌크 동기화 금지(ADR-0011).'],
  ['IconLocationpinLine','<b>GPS 좌표 미저장</b> - <code>discoveries</code>에 좌표 없음. 지오펜스는 온디바이스(ADR-0010).'],
  ['IconFlagLine','<b>신고·이상감지</b> - 사용자 신고(<code>reports</code>, 다형) + 자동 이상감지(<code>abuse_flags</code>: 발견 폭주·이동 불가 속도, 공개 좌표만). 제재는 <code>users.status</code>.'],
  ['IconPersonShieldLine','<b>운영자 콘솔(Admin)</b> - 신고·이상감지 검토·처리는 내부 화면(소비자 앱과 분리). OAuth + <code>users.role=admin</code>, 처리는 <code>moderation_actions</code> audit.'],
  ['IconBarchartSquareLine','<b>카운터는 결과적 일관성</b> - <code>place_counters</code>·<code>saved_count</code>·<code>cheer_count</code>는 이벤트/집계.'],
  ['🆔','PK는 <code>uuid</code>. 발견·담기·응원은 <code>unique</code>로 멱등.'],
];
export const CTX: readonly ContextRow[] = [
  ['Identity','var(--seed-color-palette-purple-800)','계정·인증'],['Collection','var(--seed-color-palette-blue-700)','수집·도감 · Core'],['Achievement','var(--seed-color-palette-yellow-700)','칭호 · Core'],
  ['Course','var(--seed-color-palette-green-600)','코스·프리셋'],['Plaza','var(--seed-color-palette-red-700)','광장·소셜'],['Moderation','var(--seed-color-palette-red-900)','신고·제재'],
  ['Catalog','var(--seed-color-palette-green-800)','자원 카탈로그 · 시드/캐시'],['Recommendation','var(--seed-color-palette-gray-700)','무상태'],['Media','var(--seed-color-palette-gray-700)','스토리지'],
];
export const RELS: readonly RelationRow[] = [
  ['users → discoveries / presets / companions','FK','fk','N:1'],
  ['users → reports / abuse_flags / moderation_actions','FK','fk','N:1'],
  ['preset_saves (users ↔ presets)','junction','fk','N:M - 담기'],
  ['feed_cheers (users ↔ feed_items)','junction','fk','N:M - 응원'],
  ['companion_members (users ↔ companions)','junction','fk','N:M - 참여'],
  ['feed_comments → feed_items','FK','fk','N:1'],
  ['wishlist / account_titles / feed_items . user_id → users','ID 참조','id','컨텍스트 간(물리 FK 없음)'],
  ['regions / categories → discoveries','시드 참조','id','region_id·category_id'],
  ['place_snapshot → discoveries.place_id','read-through 캐시','id','캐시 미존재 가능 → FK 없음'],
  ['reports.target_id → FEED/PRESET/COMPANION/USER','다형 ID','id','target_type + target_id'],
  ['Collection → Achievement·Plaza·Moderation','PlaceDiscovered','ev','도메인 이벤트'],
  ['Achievement → Plaza','TitleEarned','ev','도메인 이벤트'],
  ['Course → presets.saved_count','PresetSaved/Unsaved','ev','집계 카운터'],
];
export const MAP: readonly MappingRow[] = [
  ['Account','users','Identity'],['Discovery / PlaceCounter','discoveries / place_counters','Collection'],
  ['AccountTitles','account_titles','Achievement'],['Preset / PresetSave','presets / preset_saves','Course'],
  ['FeedItem / Cheer / Comment','feed_items / feed_cheers / feed_comments','Plaza'],
  ['Companion / CompanionMember','companions / companion_members','Plaza'],
  ['Report / AbuseFlag / ModerationAction','reports / abuse_flags / moderation_actions','Moderation'],
  ['Region / Category(시드) · PlaceSnapshot(캐시)','regions / categories / place_snapshot / region_category_counts','Catalog'],
];
export const EXT: readonly IconTextRow[] = [
  ['IconMapLine','<b>KTO 자원 원문·사진</b>: 실시간 호출(KtoTourClient ACL). <code>place_snapshot</code>은 read-through 캐시. 벌크 동기화 금지.'],
  ['IconLocationpinLine','<b>사용자 GPS 좌표</b>: 저장·수신 안 함(온디바이스, 서버엔 placeId만).'],
  ['IconPictureLine','<b>사진 바이너리</b>: 오브젝트 스토리지(Media). DB엔 URL만.'],
  ['IconTrophyLine','<b>혼잡도·다양성 지표</b>: TatsCnctrRate / AreaTarDiv 실시간(상대 비교).'],
];
export const MERMAID_SIMPLE: string = `flowchart LR
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
  classDef identity fill:var(--seed-color-palette-purple-200),stroke:var(--seed-color-palette-purple-800),color:var(--seed-color-fg-neutral);
  classDef collection fill:var(--seed-color-palette-blue-200),stroke:var(--seed-color-palette-blue-700),color:var(--seed-color-fg-neutral);
  classDef achievement fill:var(--seed-color-palette-yellow-200),stroke:var(--seed-color-palette-yellow-700),color:var(--seed-color-fg-neutral);
  classDef course fill:var(--seed-color-palette-green-200),stroke:var(--seed-color-palette-green-600),color:var(--seed-color-fg-neutral);
  classDef plaza fill:var(--seed-color-palette-red-200),stroke:var(--seed-color-palette-red-700),color:var(--seed-color-fg-neutral);
  classDef moderation fill:var(--seed-color-palette-red-300),stroke:var(--seed-color-palette-red-900),color:var(--seed-color-fg-neutral);
  classDef catalog fill:var(--seed-color-palette-green-300),stroke:var(--seed-color-palette-green-800),color:var(--seed-color-fg-neutral);
  class users identity;
  class discoveries,place_counters collection;
  class account_titles achievement;
  class presets course;
  class feed_items,feed_comments,companions plaza;
  class reports,abuse_flags,moderation_actions moderation;
  class place_snapshot,regions,categories,region_category_counts catalog;`;
export const MERMAID_DETAIL: string = `erDiagram
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
  discoveries { uuid id PK  uuid user_id FK  text place_id "KTO"  text review "선택" }
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
