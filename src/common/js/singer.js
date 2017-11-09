export default class Singer {
    constructor({ id, name, nickName }) {
        this.id = id;
        this.name = name;
        this.nickName = nickName;
        this.touxiang = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg`;
        this.singerLink = `https://y.qq.com/n/yqq/singer/${id}.html`;
    }
}