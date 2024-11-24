import classNames from "classnames"
import "./index.scss"
import toRoman from "../../utils/toRoman";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectPageIndex } from "../../store/article";
const Directory = () => {
  const dispatch = useDispatch()
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const storeSelectPageIndex = useSelector(state => state.article.selectPageIndex);
  
  const [directoryList, setDirectoryList] = useState([

    {
      label: "article1article1article1article1",
      pageIndex: 1,
    },
    {
      label: "article2article2article2",
      pageIndex: 2,
    },
    {
      label: "article3article3",
      pageIndex: 3,
    },
    {
      label: "article4article4article4article4article4",
      pageIndex: 4,
    },
    {
      label: "article5article5",
      pageIndex: 5,
    },
    {
      label: "article6article6article6article6article6article6article6",
      pageIndex: 6,
    },
  ]);

  const handleLabelClick=(index)=>{
    // console.log(index)
    dispatch(setSelectPageIndex(index))
  }

  useEffect(()=>{
    // console.log(storeSelectPageIndex)
  },[storeSelectPageIndex])
  return <div className={classNames("directory-container")}>
    <div className="directory-tittle-container">
      目录
    </div>
    <div className="directory-list-container">
      {
        directoryList.map((item, index) => {
          return <div className="directory-list-item" key={index}>
            <div className="directory-list-item-num">
              {toRoman(index + 1)}
            </div>
            <div className="directory-list-item-label" onClick={() => {
              handleLabelClick(index)
            }}>
              {item.label}
            </div>
          </div>
        })
      }
    </div>
  </div>
}
export default Directory