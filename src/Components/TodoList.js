import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";
import { Table } from "react-bootstrap";
import PopupWindow from "./PopupWindow";
import { icons } from "./Icon_pkg";
import { FcEmptyTrash, FcInspection } from "react-icons/fc";
import createNotification from "./reactNotification";
import moment from "moment/moment";
// import Dictaphone from "./Dictaphone";

function TodoList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectIcon, setselectIcon] = useState(null);
  const [enterTask, setEnterTaskName] = useState("");
  const [filter, setFilter] = useState("All"); // initialize filter state to "All"

  const [taskList, setTaskList] = useState(
    // Load the task list from the local storage when the component is mounted
    JSON.parse(localStorage.getItem("taskList")) || []
  );

  useEffect(() => {
    // Save the task list to the local storage when it changes
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  // const addTask = () => {
  //   if (enterTask && selectIcon) {
  //     const newTask = {
  //       id: Date.now(),
  //       title: enterTask,
  //       icon: selectIcon ? selectIcon.image : null,
  //       completed: false, // add a 'completed' property to the new task
  //       createdAt: moment().format("MMMM Do YYYY, h:mm a"), // add a createdAt property with the current date and time
  //     };

  //     setTaskList([...taskList, newTask]);
  //     setEnterTaskName("");
  //     setselectIcon(null);
  //     createNotification("success", "Task added.");
  //   }
  // };
  const addTask = () => {
    if (enterTask) {
      const newTask = {
        id: Date.now(),
        title: enterTask,
        icon: selectIcon ? selectIcon.image : null,
        completed: false, // add a 'completed' property to the new task
        createdAt: moment().format("MMMM Do YYYY, h:mm a"), // add a createdAt property with the current date and time
      };

      setTaskList([...taskList, newTask]);
      setEnterTaskName("");
      setselectIcon(null);
      createNotification("success", "Task added.");
    }
  };
  // console.log("enterTask---", addTask);

  const deleteTask = (index) => {
    const originalIndex = taskList.length - 1 - index; // Calculate the original index
    const newTaskList = [...taskList];
    newTaskList.splice(originalIndex, 1);
    setTaskList(newTaskList);
  };

  const completeTask = (id) => {
    const updatedTasks = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: true, // update the 'completed' property of the selected task
        };
      }
      return task;
    });
    setTaskList(updatedTasks);
  };

  const filteredTasks = taskList.filter((task) => {
    if (filter === "All") {
      return true; // return all tasks if the filter is set to "All"
    } else if (filter === "Complete") {
      return task.completed; // return only completed tasks if the filter is set to "Complete"
    } else if (filter === "Incomplete") {
      return !task.completed; // return only incomplete tasks if the filter is set to "Incomplete"
    }
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // update filter state when the select box changes
  };

  // const showSelectedIcon = (icon) => {
  //   setselectIcon(icon);
  //   setIsModalOpen(false);
  //   if (!enterTask) {
  //     createNotification("error", "Please enter a task.");
  //     return;
  //   } else {
  //     addTask();
  //   }
  // };
  // console.log("selectIcon===", selectIcon);

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  // console.log("taskList=====>", taskList);
  return (
    <div style={{ backgroundColor: "beige", height: "100vh", width: "100vw" }}>
      <div className="head">
        <h3
          className="p-3"
          style={{ color: "#013456", fontWeight: 700, fontSize: "35px" }}
        >
          <FcInspection /> To Do
        </h3>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Greeting />
            <div className="add-todo">
              <div className="m-3">
                <input
                  className="text-box"
                  placeholder="What do you need to do today?"
                  value={enterTask}
                  onChange={(e) => {
                    setEnterTaskName(e.target.value);
                  }}
                />
              </div>{" "}
              <div className="button-style">
                <button
                  className="add_btn"
                  title="Add"
                  // onClick={() => {
                  //   !selectIcon ? handleModalOpen() : addTask();
                  // }}
                  onClick={() => addTask()}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="add-icon">
              {/* <OverlayTrigger
            placement="right"
            delay={{ show: 150, hide: 400 }}
            overlay={renderTooltip}
          > */}
              {/* <span>
                {" "}
                <i
                  title="Add Icon's"
                  class="fa-solid fa-circle-plus show-text-onHover"
                  style={{ cursor: "pointer" }}
                  onClick={handleModalOpen}
                ></i>
              </span> */}
              {/* {selectIcon && (
                <span>
                  <img
                    className="icon0"
                    src={selectIcon.image}
                    alt="loading"
                    title={selectIcon.name}
                  />
                </span>
              )} */}

              {/* </OverlayTrigger> */}
            </div>
            {/* <div className="model-popup m-3">
              {isModalOpen && (
                <PopupWindow onClose={handleModalClose}>
                  <div className="row">
                    {icons.map((data) => (
                      <div className="col-2 p-1">
                        <img
                          className="icon1"
                          src={data.image}
                          alt="loading"
                          title={data.name}
                          onClick={() => showSelectedIcon(data)}
                        />
                      </div>
                    ))}
                  </div>
                </PopupWindow>
              )}
            </div> */}
          </div>
          <div className="col-md-6 clm-top">
            <div className="filter-type">
              <label htmlFor="filter">Filter by:</label>{" "}
              <select
                className="select-option"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <div className="table-data mb-3">
              <Table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th style={{ paddingLeft: "45px" }}>Task</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.reverse().map((task, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          class="larger-checkbox ms-3"
                          checked={task.completed} // determine whether the checkbox should be checked
                          onChange={() => completeTask(task.id)} // call the completeTask function when the checkbox is changed
                        />
                      </td>
                      <td>
                        {/* <img src={task?.icon} alt="" className="table-image" />{" "} */}
                        <span>{task.title}</span>
                        <p
                          className="mt-1"
                          style={{
                            fontSize: "10px",
                            color: "#fad405",
                          }}
                        >
                          <i>{task.createdAt}</i>
                        </p>{" "}
                        {/* display the relative timestamp */}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <FcEmptyTrash
                          title="Delete"
                          style={{ fontSize: "27px", cursor: "pointer" }}
                          onClick={() => deleteTask(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
