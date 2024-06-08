import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineDoNotDisturb } from "react-icons/md";
const TaskCreatorHome = () => {
  const { user } = useAuth();
  // console.log(user);
  const [data, refetch] = useRole();
  const [tasks, setTasks] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [control, setControl] = useState(false);
  useEffect(() => {
    axiosSecure(`/submitted/${user?.email}`).then((result) => {
      setTasks(result.data);
      // console.log(result.data);
    });
  }, [user, control, axiosSecure]);

  const [selectedTask, setSelectedTask] = useState(null);
  const closeModal = () => {
    setSelectedTask(null);
  };

  const openModal = (task) => {
    setSelectedTask(task);
    document.getElementById(`modal_${task._id}`).showModal();
  };

  const handleStatus = async (status, id) => {
    const newStatus = status;
    console.log(newStatus, id);
    try {
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/submissionMark/${id}`,
        { newStatus }
      );
      console.log(data);
      toast.success(`Task ${newStatus} Successfully!`);
      // navigate('/')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section className="container px-4 mx-auto pt-24">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">
            Task&rsquo;s To Review
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {tasks?.length} Task&rsquo;s
          </span>
        </div>

        <div className="flex flex-col mt-6 min-h-[80vh]">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Worker Info</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Title</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Amount</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Detail</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Approve
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Reject
                      </th>

                      {/* <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th> */}
                    </tr>
                  </thead>
                  {tasks.map((task) => (
                    <tbody
                      key={task._id}
                      className="bg-white divide-y divide-gray-200 "
                    >
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {task?.worker_info.displayName}
                          <br />
                          {task?.worker_info.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {task?.task_title}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {task?.payable_amount}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {/* Open the modal using document.getElementById('ID').showModal() method */}
                          <button
                            className="btn"
                            onClick={() => openModal(task)}
                          >
                            View Submission Details
                          </button>

                          <dialog id={`modal_${task._id}`} className="modal">
                            <div className="modal-box">
                              <p className="py-4">{task.submission_details}</p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button onClick={closeModal}>Close</button>
                            </form>
                          </dialog>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <p
                            onClick={() => handleStatus("Approved", task?._id)}
                            className="text-xl text-[#0077cc] cursor-pointer hover:text-[#005fa3]"
                          >
                            <MdOutlinePendingActions />
                          </p>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-00 whitespace-nowrap">
                          <p
                            onClick={() => handleStatus("Reject", task?._id)}
                            className="text-2xl text-[#e74c3c] cursor-pointer hover:text-[#c0392b]"
                          >
                            <MdOutlineDoNotDisturb />
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskCreatorHome;
