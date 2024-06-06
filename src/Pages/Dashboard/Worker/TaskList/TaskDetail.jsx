import { useLoaderData } from "react-router-dom";

const TaskDetail = () => {
  const task = useLoaderData();
  console.log(task);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const submission_details = form.submission_details.value;
    const current_date = new Date().toISOString();
    const submit = { ...task, submission_details, current_date };
    console.log(submit);
  };
  return (
    <div className="flex flex-col md:flex-row container mx-auto gap-5 py-20">
      <div className="flex-1">
        <img src={task?.task_img_url} alt={task?.task_title} />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-1 space-y-5">
          <h2 className="text-3xl font-bold">{task?.task_title}</h2>
          <p>{task?.task_detail}</p>
          <hr />
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Price: ${task?.payable_amount}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-bold">
                {" "}
                <span className="text-yellow-500"></span>{" "}
                {task?.submission_details}
              </p>
            </div>
          </div>
          <hr />
          <div className="space-y-3">
            <h3 className="font-bold">Quantity : {task?.task_quantity}</h3>
            <hr />
          </div>
          <hr />
          <div>
            <p className="font-bold">Owner Information : </p>
            <p>Name : {task?.task_creator?.name}</p>
            <p>Email : {task?.task_creator?.email}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="submission_details">Submission Details</label>
              </div>
              <textarea
                required
                name="submission_details"
                className="textarea textarea-bordered"
                placeholder="Submission Details"
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Submite
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
