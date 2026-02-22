import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentProjectId, setCurrentProjectId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [taskName, setTaskName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");

  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const createProject = () => {
    if (!title) return;

    const newProject = {
      id: Date.now(),
      title,
      description,
      tasks: []
    };

    setProjects([...projects, newProject]);
    setTitle("");
    setDescription("");
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    if (currentProjectId === id) setCurrentProjectId(null);
  };

  const startEditProject = (project) => {
    setEditingProjectId(project.id);
    setTitle(project.title);
    setDescription(project.description);
  };

  const saveProjectEdit = () => {
    setProjects(
      projects.map(p =>
        p.id === editingProjectId
          ? { ...p, title, description }
          : p
      )
    );
    setEditingProjectId(null);
    setTitle("");
    setDescription("");
  };

  const currentProject = projects.find(p => p.id === currentProjectId);

  const addTask = (status = "todo") => {
    if (!taskName) return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      shortDesc,
      longDesc,
      status
    };

    const updatedProjects = projects.map(p =>
      p.id === currentProjectId
        ? { ...p, tasks: [...p.tasks, newTask] }
        : p
    );

    setProjects(updatedProjects);
    setTaskName("");
    setShortDesc("");
    setLongDesc("");
  };

  const moveTask = (taskId, newStatus) => {
    const updatedProjects = projects.map(p => {
      if (p.id !== currentProjectId) return p;

      return {
        ...p,
        tasks: p.tasks.map(t =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      };
    });

    setProjects(updatedProjects);
  };

  const deleteTask = (taskId) => {
    const updatedProjects = projects.map(p => {
      if (p.id !== currentProjectId) return p;

      return {
        ...p,
        tasks: p.tasks.filter(t => t.id !== taskId)
      };
    });

    setProjects(updatedProjects);
  };

  // =============================
  // PROJECT LIST SCREEN
  // =============================
  if (!currentProject) {
    return (
      <div className="container">
        <h2>Create New Project</h2>

        <input
          placeholder="Project Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {editingProjectId ? (
          <button onClick={saveProjectEdit}>Save Changes</button>
        ) : (
          <button onClick={createProject}>Create Project</button>
        )}

        <hr style={{ margin: "30px 0" }} />

        <h3>Existing Projects</h3>

        {projects.length === 0 && <p>No projects yet.</p>}

        {projects.map(project => (
          <div key={project.id} className="task">
            <h4>{project.title}</h4>
            <p>{project.description}</p>

            <button onClick={() => setCurrentProjectId(project.id)}>
              Open
            </button>

            <button onClick={() => startEditProject(project)}>
              Edit
            </button>

            <button
              style={{ background: "#e53935" }}
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }

  // =============================
  // PROJECT BOARD SCREEN
  // =============================
  return (
    <div className="container">
      <button
        style={{ marginBottom: "20px" }}
        onClick={() => setCurrentProjectId(null)}
      >
        ← Back to Projects
      </button>

      <h1>{currentProject.title}</h1>
      <p>{currentProject.description}</p>

      <div className="task-form">
        <h3>Add Task</h3>
        <input
          placeholder="Task Name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <input
          placeholder="Short Description"
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
        />
        <textarea
          placeholder="Long Description"
          value={longDesc}
          onChange={e => setLongDesc(e.target.value)}
        />
        <button onClick={() => addTask("todo")}>Add to Todo</button>
      </div>

      <div className="board">
        {["todo", "onprocess", "finished"].map(status => (
          <div key={status} className="column">
            <h3>
              {status === "todo"
                ? "Todo"
                : status === "onprocess"
                ? "On Process"
                : "Finished"}
            </h3>

            {currentProject.tasks
              .filter(task => task.status === status)
              .map(task => (
                <div key={task.id} className="task">
                  <h4>{task.name}</h4>
                  <p>{task.shortDesc}</p>
                  <p>{task.longDesc}</p>

                  {status !== "todo" && (
                    <button onClick={() => moveTask(task.id, "todo")}>
                      Todo
                    </button>
                  )}
                  {status !== "onprocess" && (
                    <button onClick={() => moveTask(task.id, "onprocess")}>
                      On Process
                    </button>
                  )}
                  {status !== "finished" && (
                    <button onClick={() => moveTask(task.id, "finished")}>
                      Finished
                    </button>
                  )}

                  <button
                    style={{ background: "#444" }}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}