# modorip.github.io

**모두립**의 공개 웹사이트입니다. 랜딩과 법적 문서를 담습니다.

| 경로 | 내용 |
|---|---|
| `/` | 서비스 소개 |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |
| `/location` | 위치기반서비스 이용약관 |
| `/support` | 문의와 도움말 |

**모두립**은 GPS 로 관광자원을 발견해 전국 도감을 채우는 여행 앱입니다.
2026 관광데이터 활용 공모전 출품작이며, 팀 **MILLO** 가 만듭니다.

문의 — gdpark.dev@gmail.com

---

## 개발

Next.js · TypeScript · [SEED Design](https://seed-design.io). 정적 사이트로 내보내
GitHub Pages 로 배포합니다.

```sh
npm ci
npm run dev      # http://localhost:3000
npm run build    # out/ 으로 정적 export
npm run lint
```

`main` 에 반영되면 Actions 의 `Pages` 워크플로가 배포합니다.

## 라이선스와 귀속

UI 는 당근마켓 [SEED Design](https://seed-design.io)(Apache-2.0)으로 만듭니다.
귀속 고지는 `/licenses` 에 있습니다.

**이 저장소는 오픈소스가 아닙니다.** 소스가 공개돼 있을 뿐이며, 별도 고지가 없는 한
모든 권리는 MILLO 에 있습니다.
