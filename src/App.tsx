import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import "./fonts/iconfont.css";
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "./utils/localStorage";

type TodoListData = {
  title: string;
  content: string;
  tag: string;
  priority: string;
  done: Boolean;
}[];

function App() {
  const [show, setShow] = useState(false);
  const [todaData, setTodoData] = useState(
    getDataFromLocalStorage<TodoListData>("todoListData")
  );
  const [isSelect, setIsSelect] = useState([false, false, false, false]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [priority, setPriority] = useState("");
  // 判断todoData数组里每个对象的属性是否都有值
  const [everyNull, setEveryNull] = useState(
    getDataFromLocalStorage<TodoListData>("todoListData")?.every((current) => {
      return (
        current.content === "" &&
        current.priority === "" &&
        current.tag === "" &&
        current.title === ""
      );
    })
  );
  const showEdit = () => {
    setShow(!show);
  };

  const submit = () => {
    todaData
      ? setTodoData([
          ...todaData,
          {
            title,
            content,
            tag,
            priority,
            done: false,
          },
        ])
      : setTodoData([
          {
            title,
            content,
            tag,
            priority,
            done: false,
          },
        ]);
    setTitle("");
    setContent("");
    setTag("");
    setPriority("");
    setIsSelect([false, false, false, false]);
    setShow(!show);
  };

  const selectPriority = (value: number) => {
    setIsSelect(
      isSelect.map((item, index) => {
        if (index === value) {
          return !item;
        }
        return false;
      })
    );
    switch (value) {
      case 0:
        setPriority("P1");
        break;
      case 1:
        setPriority("P2");
        break;
      case 2:
        setPriority("P3");
        break;
      case 3:
        setPriority("P4");
        break;
    }
  };

  const dataCollection = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    switch (value) {
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      case "tag":
        setTag(e.target.value);
        break;
    }
  };

  const todoDone = (index: number) => {
    todaData &&
      setTodoData(
        todaData?.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              done: !item.done,
            };
          }
          return item;
        })
      );
  };

  const clear = (index: number) => {
    todaData &&
      setTodoData(
        todaData?.filter((item, idx) => {
          if (idx === index) {
            return false;
          }
          return true;
        })
      );
  };

  useEffect(() => {
    show &&
      setTimeout(() => {
        window.scrollTo(
          0,
          document.body.scrollHeight || document.documentElement.scrollHeight
        );
      }, 0);
  }, [show]);

  useEffect(() => {
    todaData && saveDataToLocalStorage<TodoListData>("todoListData", todaData);
    setEveryNull(
      getDataFromLocalStorage<TodoListData>("todoListData")?.every(
        (current) => {
          return (
            current.content === "" &&
            current.priority === "" &&
            current.tag === "" &&
            current.title === ""
          );
        }
      )
    );
  }, [todaData]);

  return (
    <>
      <div className="topMask" />
      <div className="bottomMask">
        {show ? (
          <div className="edit">
            <i className="iconfont icon-cross" onClick={showEdit}></i>
            <i className="iconfont icon-zhuangtaigougou" onClick={submit}></i>
          </div>
        ) : (
          <div className="add" onClick={showEdit}>
            <div className="plus" />
          </div>
        )}
      </div>
      <div className="title">Daily Todo</div>
      <div className="App">
        {/* todaData为null的情况 */}
        {!todaData && (
          <div className="nodata">
            There is no todo yet, click the button below to add it
          </div>
        )}
        {/* todaData为空数组的情况 */}
        {todaData?.length === 0 && (
          <div className="nodata">
            There is no todo yet, click the button below to add it
          </div>
        )}
        {/* todaData数组里每一个对象的属性值为空的情况 */}
        {everyNull && (
          <div className="nodata">
            There is no todo yet, click the button below to add it
          </div>
        )}
        {todaData?.map((item, index) => {
          return (
            <div
              key={index}
              className="todo"
              style={{ opacity: show ? "0.5" : "unset" }}
            >
              <svg
                className="delete"
                onClick={() => {
                  clear(index);
                }}
                width="142"
                height="165"
                viewBox="0 0 142 165"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M92.0883 58.8791L89.378 129.379M51.872 129.379L49.1617 58.8791M127.244 33.7341C129.923 34.1414 132.587 34.5722 135.25 35.0344M127.244 33.7419L118.878 142.484C118.537 146.912 116.537 151.047 113.278 154.064C110.019 157.08 105.741 158.755 101.3 158.754H39.9497C35.5089 158.755 31.2313 157.08 27.9723 154.064C24.7133 151.047 22.7131 146.912 22.3717 142.484L14.0057 33.7341M127.244 33.7341C118.204 32.3673 109.116 31.33 100 30.6242M6 35.0266C8.66333 34.5644 11.3267 34.1336 14.0057 33.7341M14.0057 33.7341C23.0464 32.3673 32.1338 31.33 41.25 30.6242M100 30.6242V23.4489C100 14.2056 92.8717 6.49758 83.6283 6.20775C74.9617 5.93075 66.2883 5.93075 57.6217 6.20775C48.3783 6.49758 41.25 14.2134 41.25 23.4489V30.6242M100 30.6242C80.4458 29.113 60.8042 29.113 41.25 30.6242"
                  stroke="#F3F4F6"
                  strokeWidth="11.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item.done ? (
                <i
                  className="iconfont icon-Rrl_s_023 finish"
                  onClick={() => todoDone(index)}
                  style={{ fontSize: "153px", color: "#1677ff" }}
                ></i>
              ) : (
                <svg
                  className="finish"
                  onClick={() => todoDone(index)}
                  width="153"
                  height="153"
                  viewBox="0 0 153 153"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M53 82.375L70.625 100L100 58.875M147 76.5C147 85.7582 145.176 94.9257 141.634 103.479C138.091 112.033 132.898 119.804 126.351 126.351C119.804 132.898 112.033 138.091 103.479 141.634C94.9257 145.176 85.7582 147 76.5 147C67.2418 147 58.0743 145.176 49.5208 141.634C40.9674 138.091 33.1955 132.898 26.649 126.351C20.1024 119.804 14.9094 112.033 11.3665 103.479C7.82354 94.9257 6 85.7582 6 76.5C6 57.8022 13.4277 39.8703 26.649 26.649C39.8703 13.4277 57.8022 6 76.5 6C95.1978 6 113.13 13.4277 126.351 26.649C139.572 39.8703 147 57.8022 147 76.5Z"
                    stroke="#F1F5F9"
                    strokeWidth="11.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {(item.title || item.content || item.priority || item.tag) && (
                <div className="card">
                  {item.title && <div className="top">{item.title}</div>}
                  {item.content && <div className="middle">{item.content}</div>}

                  <div className="bottom">
                    {item.priority && (
                      <div className="priority">{item.priority}</div>
                    )}
                    {item.tag && (
                      <div
                        className="tags"
                        style={{ marginLeft: item.priority ? "10px" : "0px" }}
                      >
                        {item.tag}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {show ? (
          <div className="todo">
            <div className="submit">
              <input
                type="text"
                onChange={(e) => dataCollection(e, "title")}
                className="textTitle"
                placeholder="Please input todo title"
              />
              <input
                type="text"
                onChange={(e) => dataCollection(e, "content")}
                className="content"
                placeholder="Please input todo content"
              />
              <input
                type="text"
                onChange={(e) => dataCollection(e, "tag")}
                className="tag"
                placeholder="Please input todo tag"
              />
              <div>
                <button
                  onClick={() => selectPriority(0)}
                  style={{
                    backgroundColor: isSelect[0] ? "#1677ff" : "unset",
                    color: isSelect[0] ? "white" : "unset",
                  }}
                >
                  1
                </button>
                <button
                  onClick={() => selectPriority(1)}
                  style={{
                    backgroundColor: isSelect[1] ? "#1677ff" : "unset",
                    color: isSelect[1] ? "white" : "unset",
                  }}
                >
                  2
                </button>
                <button
                  onClick={() => selectPriority(2)}
                  style={{
                    backgroundColor: isSelect[2] ? "#1677ff" : "unset",
                    color: isSelect[2] ? "white" : "unset",
                  }}
                >
                  3
                </button>
                <button
                  onClick={() => selectPriority(3)}
                  style={{
                    backgroundColor: isSelect[3] ? "#1677ff" : "unset",
                    color: isSelect[3] ? "white" : "unset",
                  }}
                >
                  4
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
