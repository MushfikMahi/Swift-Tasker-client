import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MySubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    axiosSecure(`/submission/${user?.email}`).then((result) => {
      setSubmissions(result.data);
      // console.log(result.data);
    });
  }, [axiosSecure, user?.email]);
  console.log(submissions);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Title</td>
              <td>Payable Amount</td>
              <td>Worke Email</td>
              <td>Creator Email</td>
              <td>Submitted Date</td>
              <td>Status</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, idx) => (
              <tr key={submission?._id}>
                <th>{idx + 1}</th>
                <td>{submission?.task_title}</td>
                <td>{submission?.payable_amount}</td>
                <td>{submission?.worker_info?.email}</td>
                <td>{submission?.task_creator?.email}</td>
                <td>
                  {new Date(submission?.current_date).toLocaleDateString()}
                </td>
                <td>{submission?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmission;
