import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link,NavLink } from "react-router-dom";

import request from "api/axios.js";

import { Toast,NavBar,Icon,Tabs } from "antd-mobile";

const tabs = [
    { title: "发现", url: "find" },
    { title: "频道", url: "cate" },
    { title: "我的", url: "me" },
];  

function parseLink(str) {
    // const [currentTap] = useState(0);
    var arr = str.match(/\[a: href="[^\（]+" content="[^\（]+"\]/g);

    // console.log('arr',arr, str);

    if (arr) {
        var Parsed = arr.map((element, index) => {
            var tmp = element.split(" ");
            tmp.shift();
            return tmp.map((str) => {
                var patt = /".+"/;
                return patt.exec(str)[0].replace('"', "");
            });
        });
        var y = str.split(/\[a: href="[^\（]+" content="[^\（]+"\]/g);
        y.forEach((element, index) => {
            if (Parsed[index]) {
                y[index] = element + `<a href="${Parsed[index][0]}">${Parsed[index][1]}</a>`;
            }
        });
        return y.join();
    }
    return str;
}

// import "styles/Album.scss";
export default function Album() {
    const [detail, setDetail] = useState(null);
    let params = useParams();
    console.log(useLocation());

    useEffect(() => {
        console.log(params.id);
        loadingToast();
        request
            .getDetailByPostId(params.id)
            .then((response) => {
                console.log(response.data);
                setDetail(response.data.data);
            })
            .finally(() => {
                Toast.hide();
            });
    }, [params.id]);

    function loadingToast() {
        Toast.loading("Loading...", 1, () => {
            console.log("Load complete !!!");
        });
    }

    return (
        <div className="album">
            {detail &&
                <>
                    <NavBar
                        mode="light"
                        // icon={<Icon type="left" />}
                        // onLeftClick={() => console.log("onLeftClick")}
                        // leftContent={<Icon key="0" type="search" />}
                        rightContent={<Icon key="0" type="search" />}
                    >
                        <Tabs
                            tabs={tabs}
                            page={1}
                            // onTabClick={(tab, index) => {
                            //     // console.log("onTabClick", index, tab);
                            //     setCurrentTap(index);
                            // }}
                            renderTab={(tab) => (
                                <NavLink to={"/" + tab.url}>
                                    <span>{tab.title}</span>
                                </NavLink>
                            )}
                        ></Tabs>
                    </NavBar>
                    { detail.format_content.map((content, index) => {
                        switch (content.type) {
                            case "normal":
                                return (
                                    <p
                                        style={content.attr}
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: parseLink(content.content) }}
                                    >
                                        {/* {parseLink(content.content)} */}
                                    </p>
                                );

                            case "image":
                                return (
                                    <img
                                        key={index}
                                        style={{ maxWidth: "100%" }}
                                        src={content.attr.src}
                                        alt=""
                                    />
                                );

                            case "title":
                                return <h5 key={index}>{content.content}</h5>;

                            case "video":
                                return (
                                    <video
                                        key={index}
                                        controls
                                        preload="none"
                                        poster={detail.content_video[content.attr.index].image}
                                        style={{ maxWidth: "100%" }}
                                        src={detail.content_video[content.attr.index].source_link}
                                    ></video>
                                );
                        }
                    })}
                </>
            }
        </div>
    );
}

// "本片来自新片场创作人[a: href=\"https://www.xinpianchang.com/u10950509?from=articleList\" content=\"GURULAB\"]（代理方/制作方），[a: href=\"https://www.xinpianchang.com/u10098203?from=articleList\" content=\"赵伯祚\"]（制片人/监制），[a: href=\"https://www.xinpianchang.com/u11000319?from=articleList\" content=\"刘潶泗\"]（策划/导演/剪辑），[a: href=\"https://www.xinpianchang.com/u10674496?from=articleList\" content=\"姚金利\"]（摄影指导），[a: href=\"https://www.xinpianchang.com/u10210772?from=articleList\" content=\"周雅倩\"]（造型指导），[a: href=\"https://www.xinpianchang.co..."
