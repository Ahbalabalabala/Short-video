import React from "react";
import "../styles/AlbumList.scss";
import { Link } from "react-router-dom";

import classNames from "classnames";
export default function AlbumList(props) {
    return (
        <section className={classNames("albumList")}>
            <h1>{props.children}</h1>
            {props.lists.map((item) => (
                <Link to={`/album/${item.postid}`} key={item.postid}>
                    <div className="item">
                        <img src={item.image} alt="" />
                        <div className="info">
                            <span>{props.children}</span>
                            <h3>{item.title}</h3>
                            <h5>{item.app_fu_title}</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}
