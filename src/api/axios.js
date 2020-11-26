import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.kele8.cn/agent/https://app.vmovier.com/",
    timeout: 30000,
});

const request = {
    getDetailByPostId: function (postId) {
        return instance.get("/apiv3/post/view", {
            params: {
                postid: postId,
            },
        });
    },
    getCateList: function () {
        return instance.get("/apiv3/cate/getList");
    },

    // https://app.vmovier.com/apiv3/post/getPostByTab?p=2&size=1&tab=hot
    // https://app.vmovier.com/apiv3/post/getPostByTab?p=2&size=1&id=1  ?
    getCate: function (options) {
        if (!options) {
            return new Promise((resolve, reject) => reject());
        }

        const params = { p: options.p ? options.p : 1, size: options.size ? options.size : 10 };

        if (options.tab) {
            params.tab = options.tab;
        } else {
            params.id = options.id;
        }

        return instance.get("/apiv3/post/getPostByTab", { params });
    },
};

export default request;
