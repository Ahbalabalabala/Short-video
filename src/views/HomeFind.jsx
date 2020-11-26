import React, { useState, useEffect } from "react";

// import useAxios from "react-axios-hook";
import axios from "axios";



import { Carousel } from "antd-mobile";
import PostList from "components/PostList";
// import {
//     AxiosProvider,
//     Request,
//     Get,
//     Delete,
//     Head,
//     Post,
//     Put,
//     Patch,
//     withAxios,
// } from "react-axios";

export default function HomeFind(props) {
    const [indexData, setIndexData] = useState(null);
    const [bannerHeight, setBannerHeight] = useState(100);

    useEffect(() => {
        props.setCurrentTap(0)

        // console.log("effect");
        // 第一种写法
        axios
            .get("http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index")
            .then(function (response) {
                // console.log(response.data.data);
                setIndexData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (indexData) {
        return (
            <div className="home">
                <Carousel autoplay={true} infinite>
                    {indexData.banner.list.map((val) => (
                        <a
                            key={val.bannerid}
                            // href={val.bannerid}
                            style={{
                                display: "inline-block",
                                width: "100%",
                                height: bannerHeight,
                            }}
                        >
                            <img
                                src={val.image}
                                style={{ width: "100%", verticalAlign: "top" }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event("resize"));
                                    setBannerHeight("auto");
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

                <PostList posts={indexData.today}/>

                <PostList posts={indexData.hot} col={true}/>
                <PostList posts={indexData.album} col={true}/>

                <PostList posts={indexData.posts}/>

            </div>
        );
    }
    return <div className="home">loading...</div>;
}

// export default function HomeFind() {
//     // const [indexData, setIndexData] = useState(null);

//     return (
//         <Get url="http://music.kele8.cn/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA">
//             {(error, response, isLoading, onReload) => {
//                 if (error) {
//                     return (
//                         <div>
//                             Something bad happened: {error.message}{" "}
//                             <button onClick={() => onReload({ params: { reload: true } })}>
//                                 Retry
//                             </button>
//                         </div>
//                     );
//                 } else if (isLoading) {
//                     return <div>Loading...</div>;
//                 } else if (response !== null) {
//                     return (
//                         <div>
//                             {response.data.message}{" "}
//                             <button onClick={() => onReload({ params: { refresh: true } })}>
//                                 Refresh
//                             </button>
//                         </div>
//                     );
//                 }
//                 return <div>Default message before request is made.</div>;
//             }}
//         </Get>
//     );
// }

// export default function HomeFind() {
//     // const [indexData, setIndexData] = useState(null);
//     const [{ response, loading, error }, refresh] = useAxios("http://music.kele8.cn/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA");

//     if (error) {
//         return <div>{JSON.stringify(error)}</div>;
//     }
//     return loading ? <div>Loading...</div> : <div>{JSON.stringify(response)}</div>;
// }
