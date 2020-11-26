import React, { useState } from "react";
import HomeFind from "./views/HomeFind";
import HomeCate from "./views/HomeCate";
import HomeMe from "./views/HomeMe";

import "./App.css";

import { NavLink, Route, Switch,Redirect } from "react-router-dom";

// import { Button } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import classNames from "classnames";
// import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import { NavBar, Icon } from "antd-mobile";

import { Tabs } from "antd-mobile";

const tabs = [
    { title: "发现", url: "find" },
    { title: "频道", url: "cate" },
    { title: "我的", url: "me" },
];

// window.location.replace("/find")
function App() {
    const [currentTap, setCurrentTap] = useState(0);

    // let TabContent;
    // switch (currentTap.title) {
    //     case "频道":
    //         TabContent = <HomeCate />;
    //         break;
    //     case "我的":
    //         TabContent = <HomeMe />;
    //         break;
    //     default:
    //         TabContent = <HomeFind xxx={currentTap} />;
    //         break;
    // }

    return (
        <div className={classNames("App", { bar: true })}>
            <Route exact path="/" render={() =><Redirect to='/find'></Redirect>}/>
            <NavBar
                mode="light"
                // icon={<Icon type="left" />}
                // onLeftClick={() => console.log("onLeftClick")}
                // leftContent={<Icon key="0" type="search" />}
                rightContent={<Icon key="0" type="search" />}
            >
                <Tabs
                    tabs={tabs}
                    page={currentTap}
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

            {/* <section className="content">{TabContent}</section> */}
            <section className="content">
                <Switch>
                    <Route path="/find">
                        <HomeFind setCurrentTap={setCurrentTap} />
                    </Route>
                    <Route path="/cate">
                        <HomeCate setCurrentTap={setCurrentTap} />
                    </Route>
                    <Route path="/me">
                        <HomeMe setCurrentTap={setCurrentTap} />
                    </Route>
                </Switch>
            </section>
        </div>
    );
}

export default App;
