import classNames from "classnames";
import "./main.scss";
import Directory from "../component/directory";
import Content_One from "../component/content_1";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons"
import { setCurrentPageIndex } from "../store/article";
import Map from "../component/map";
import { setCurrentState } from "../store/map";
import ArticleCover from "../component/cover";
const Main = () => {
    const dispatch = useDispatch()
    const storeCurrentPageIndex = useSelector(state => state.article.currentPageIndex);
    const storeSelectPageIndex = useSelector(state => state.article.selectPageIndex);
    const contentRef = useRef(null);
    const directoryRef = useRef(null)
    const coverRef = useRef(null)
    const [show, setShow] = useState(false)
    // 使用 useRef 管理每个文章元素的引用
    const articleListRef = useRef([]);
    const [currentPageIndex, setCurrentPageIndex_] = useState(storeCurrentPageIndex)
    // 初始文章列表
    const [articleList, setArticleList] = useState([
        {
            key: 1,
            content: <Content_One />,
            visible: false,
        }, {
            key: 2,
            content: <Content_One />,
            visible: false,
        }, {
            key: 3,
            content: <Content_One />,
            visible: false,
        }, {
            key: 4,
            content: <Content_One />,
            visible: false,
        }
    ]);

    useEffect(() => {
        setShow(true)
    }, [])
    // 滚动到指定页面逻辑
    useEffect(() => {

        console.log("当前选中页码:", storeSelectPageIndex);
        if (storeSelectPageIndex < 0) {
            return;
        }
        const targetElement = articleListRef.current[storeSelectPageIndex];
        console.log(targetElement)
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth", // 平滑滚动
                block: "start",
            });
        }
    }, [storeSelectPageIndex]);

    // 监控当前页面索引
    useEffect(() => {
        console.log("当前页面索引:", storeCurrentPageIndex);
        // message.success("当前页面索引:", storeCurrentPageIndex)
        if (storeCurrentPageIndex == -1) {
            dispatch(setCurrentState({
                animationsIndex: 0,
                center: [100, 40],
                pitch: 0,
                zoom: 3
            }))
        } else if (storeCurrentPageIndex == 0) {
            dispatch(setCurrentState({
                animationsIndex: 0,
                center: [100, 40],
                pitch: 0,
                zoom: 3
            }))
        } else if (storeCurrentPageIndex == 1) {
            dispatch(setCurrentState({
                animationsIndex: 0,
                center: [110, 45],
                pitch: 45,
                zoom: 8
            }))
        } else if (storeCurrentPageIndex == 2) {
            dispatch(setCurrentState({
                animationsIndex: 0,
                center: [116, 50],
                pitch: 0,
                zoom: 10
            }))
        } else if (storeCurrentPageIndex == 3) {

            dispatch(setCurrentState({
                animationsIndex: 0,
                center: [126, 40],
                pitch: 0,
                zoom: 10
            }))
        }
    }, [storeCurrentPageIndex]);

    const handleAffixClick = () => {
        if (directoryRef.current) {
            directoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }
    }
    // 初始化 IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute("data-index"));
                    if (entry.isIntersecting) {
                        // console.log(index)
                        // 设置为进入视图的索引
                        dispatch(setCurrentPageIndex(index));

                        // 更新文章的可见状态
                        setArticleList((prev) =>
                            prev.map((item, idx) =>
                                idx === index ? { ...item, visible: true } : item
                            )
                        );
                    }
                });
            },
            { threshold: 0.4 } // 20%进入视图触发
        );
        articleListRef.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        if (directoryRef.current) {
            observer.observe(directoryRef.current)
        }
        if (coverRef.current) {
            observer.observe(coverRef.current)
        }

        // 组件卸载时清除观察器
        return () => observer.disconnect();
    }, []);
    return (
        <div className={classNames("page-main-container", { show: show, }, { hidden: !show })}>
            {/* 地图部分 */}
            <div className={classNames("map-container", { show: show, }, { hidden: !show })}>
                {/* <button
                    style={{ width: "100px", height: "100px" }}
                    onClick={() => console.log(contentRef.current)}
                >
                    toggle
                </button>
                <div style={{ width: "300px", height: "100px" }}>
                    当前页面为下标为：{storeCurrentPageIndex}
                </div> */}
                <Map />
            </div>

            {/* 文章和目录 */}
            <div className={classNames("article-container", { show: show, }, { hidden: !show })}>
                <div ref={(el) => { coverRef.current = el }} data-index={-1}>
                    <ArticleCover />
                </div>
                <div ref={(el) => { directoryRef.current = el }} data-index={0}>
                    <Directory />
                </div>

                {articleList.map((item, index) => (
                    <div
                        key={item.key}
                        ref={(el) => (articleListRef.current[index] = el)}
                        data-index={index + 1}
                    >
                        {item.content}

                        <div className="artlcle-end-container" style={{ width: "40vw", height: "50px", background: "gray" }}>
                            页码为：{index}
                        </div>
                    </div>


                ))}


            </div>

            <div
                className={
                    classNames(
                        "affix-container",
                        { show: storeCurrentPageIndex > 0 },
                        { hidden: storeCurrentPageIndex <= 0 }
                    )
                }

                onClick={() => handleAffixClick()}
            >
                {/* <Button icon={<VerticalAlignTopOutlined />} shape="circle"/> */}
                <div className={classNames("affix-item")}>

                </div>
            </div>
        </div>
    );
};

export default Main;
