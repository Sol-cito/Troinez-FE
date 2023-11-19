/* eslint-disable no-plusplus */
export default function isIslandArea(zipCode: string) {
  const islandAreaList = [
    [63000, 63644], // 제주도
    [22386, 22388], // 인천 중구 섬지역
    [23004, 23010], // 인천 강화 섬지역
    [23100, 23116], // 인천 웅진 섬지역1
    [23124, 23136], // 인천 웅진 섬지역2
    [31708, 31708], // 충남 당진 섬지역
    [32133, 32133], // 충남 태안 섬지역
    [33411, 33411], // 충남 보령 섬지역
    [40200, 40240], // 경북 울룽도 전지역
    [32133, 32133], // 부산 강서구 섬지역
  ];
  for (let i = 0; i < islandAreaList.length; i++) {
    const [start, end] = islandAreaList[i];
    if (start <= parseInt(zipCode, 10) && parseInt(zipCode, 10) <= end) {
      return true;
    }
  }
  return false;
}
