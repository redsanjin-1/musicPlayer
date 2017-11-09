import jsonp from "common/js/jsonp"
export function getQQImg() {
    // 开启 vue-progress
    this.$Progress.start();

    const url = "/getQQImg";
    const data = {
        g_tk: 5381,
        uin: 0,
        notice: 0,
        platform: "h5",
        needNewCode: 1,
        format: "json"
    };

    this.$ajax({
        method: "get",
        url: url,
        data: data
    })
        .then(res => {
            this.$Progress.finish();
            this.slider = res.data.data.slider;
        })
        .catch(e => {
            this.$Progress.fail();
            console.log(e);
        });
}