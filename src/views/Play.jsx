import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link,NavLink } from "react-router-dom";

import request from "api/axios.js";

import { Toast, NavBar, Icon, Tabs } from "antd-mobile";
import "styles/Play.scss";

const tabs = [
    { title: "发现", url: "find" },
    { title: "频道", url: "cate" },
    { title: "我的", url: "me" },
];

export default function Play() {
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
        <div className="play">
            {detail && (
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
                            // page={currentTap}
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
                    <header>
                        <video
                            width="100%"
                            src={detail.content_video[0].source_link}
                            poster={detail.content_video[0].image}
                            preload="metadata"
                            controls
                            style={{ height: "55.5vw" }}
                        ></video>
                    </header>

                    <section>
                        <div className="info">
                            <h3>{detail.title}</h3>
                            {detail.cate.map((v, i) => (
                                <span key={i}>{v}</span>
                            ))}
                            <span className="dur">{`${parseInt(detail.duration / 60)}'${detail.duration % 60
                                }"`}</span>
                            <p>{detail.intro}</p>
                        </div>
                    </section>

                    {detail.relate_video.map((relate, i) => (
                        <section className="relate" key={i}>
                            <h3>
                                {relate.name} <span>more</span>
                            </h3>
                            <ul className="relate-list">
                                {relate.list.map((item) => (
                                    <Link to={`/play/${item.postid}`} key={item.postid}>
                                        <li className="relate-item">
                                            <div className="thumb">
                                                <img src={item.image} alt="" />
                                                <span className="duration">{`${parseInt(
                                                    item.duration / 60
                                                )}'${item.duration % 60}"`}</span>
                                            </div>
                                            <h5>{item.title}</h5>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </section>
                    ))}
                </>
            )}
        </div>
    );
}
