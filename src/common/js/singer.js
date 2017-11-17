export default class Singer {
    constructor({ id, mid, name, nickName }) {
        this.id = id;
        this.mid = mid;
        this.name = name;
        this.nickName = nickName;
        this.touxiang = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg`;
        this.singerLink = `https://y.qq.com/n/yqq/singer/${mid}.html`;
    }
}