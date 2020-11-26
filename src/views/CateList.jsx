import React, { useEffect, useState } from "react";

import useQuery from "hooks/useQuery";
import { Toast } from "antd-mobile";

import request from "api/axios.js";
import AlbumList from "components/AlbumList";

export default function CateList() {
    let query = useQuery();

    const [cate, setCate] = useState(null);
    const [page, setPage] = useState(1);

    // useEffect(() => {
    //     console.log(query.get("tab"), query.get("cateid"));
    // }, [query.get("tab"), query.get("cateid")]);

    useEffect(() => {
        const options = { p: page, size: 10 };
        if (query.get("tab")) {
            options.tab = query.get("tab");
        }
        if (query.get("cateid")) {
            options.id = query.get("cateid");
        }

        Toast.loading("Loading...", 1, () => {
            console.log("Load complete !!!");
        });

        // 先本地读取
        const cateFromLocal = window.localStorage.getItem(
            "cateList-" + query.get("tab") + "-p-" + page
        );
        // 本地有数据并且 没有过期
        if (cateFromLocal && JSON.parse(cateFromLocal).expire > Date.now()) {
            setCate(JSON.parse(cateFromLocal).data);
            Toast.hide();
        } else {
            request.getCate(options).then((response) => {
                // console.log(response.data.data);
                setCate(response.data.data);
                window.localStorage.setItem(
                    "cateList-" + query.get("tab") + "-p-" + page,
                    JSON.stringify({
                        data: response.data.data,
                        expire: Date.now() + 0.5 * 60 * 60 * 1000,
                    })
                );

                Toast.hide();
            });
        }
    }, [query.get("tab"), query.get("cateid")]);

    return <div>{cate && <AlbumList lists={cate}>专题</AlbumList>}</div>;
}
