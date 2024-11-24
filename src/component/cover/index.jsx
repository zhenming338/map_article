import { Divider } from "antd"
import "./index.scss"
import classNames from "classnames"
const ArticleCover = () => {
    return <div className={classNames("articleCover-container")}>
        <div className="avatar-container">
            <img className="avatar-item" src="/public/cover.png" alt="" />
        </div>
        <div className="time-container">
            <Divider className={classNames("time-top-item")} >1938-1950</Divider>
            <div className="time-content-container">
                毛主席生平
            </div>
            <Divider className="time-bottom-item"></Divider>
            <div className="time-content-detail-container">
                这是描述文档这是描述文档这是描述文档这是描述文档这是描述文档
            </div>
        </div>
        <div className="mark-container"></div>
    </div>
}
export default ArticleCover