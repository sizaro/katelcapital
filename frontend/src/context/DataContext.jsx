import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";



const DataContext = createContext();

const mockUsers = [
  {
    id: 1,
    name: "Kato John",
    role: "employer",
    company: "Katel Logistics",
  },
  {
    id: 2,
    name: "Sarah Namusoke",
    role: "worker",
    skills: ["Plumbing", "Repairs"],
    rating: 4.8,
  },
  {
    id: 3,
    name: "Musa Peter",
    role: "worker",
    skills: ["Electrician"],
    rating: 4.5,
  },
];

const mockJobs = [
  {
    id: 1,
    title: "Fix water pipes",
    description: "Need urgent plumbing repair",
    budget: 50000,
    employerId: 1,
  },
  {
    id: 2,
    title: "House wiring",
    description: "Install full wiring",
    budget: 150000,
    employerId: 1,
  },
];

const mockApplications = [
  {
    id: 1,
    jobId: 1,
    workerId: 2,
    coverLetter: "I can fix this quickly",
  },
];

const mockContracts = [
  {
    id: 1,
    jobId: 1,
    workerId: 2,
    employerId: 1,
    status: "active",
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    text: "Are you available?",
  },
];


export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
const [jobs, setJobs] = useState([]);
const [applications, setApplications] = useState([]);
const [contracts, setContracts] = useState([]);
const [messages, setMessages] = useState([]);
const [currentUser, setCurrentUser] = useState(null);


  const navigate = useNavigate();

  const SOCKET_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const socket = io(SOCKET_API_URL.replace("/api", ""), {
    withCredentials: true,
  transports: ["websocket"],
  secure: import.meta.env.PROD,
  autoConnect: false
});

  // ---------- Employees CRUD ----------
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/users`);
  //     setUsers(res.data);
  //     return res.data;
  //   } catch (err) {
  //     console.error("Error fetching employees:", err);
  //     throw err;
  // };}


  const fetchUsers = async () => {
  await new Promise((res) => setTimeout(res, 300));
  setUsers(mockUsers);
};

const fetchJobs = async () => {
  await new Promise((res) => setTimeout(res, 300));
  setJobs(mockJobs);
};

const fetchApplications = async () => {
  await new Promise((res) => setTimeout(res, 300));
  setApplications(mockApplications);
};

const fetchContracts = async () => {
  await new Promise((res) => setTimeout(res, 300));
  setContracts(mockContracts);
};

const fetchMessages = async () => {
  await new Promise((res) => setTimeout(res, 300));
  setMessages(mockMessages);
};

const createJob = async (jobData) => {
  const newJob = {
    id: Date.now(),
    ...jobData,
  };

  setJobs((prev) => [...prev, newJob]);
  return { success: true };
};


const applyToJob = async (jobId, workerId) => {
  const newApp = {
    id: Date.now(),
    jobId,
    workerId,
  };

  setApplications((prev) => [...prev, newApp]);
  return { success: true };
};

const hireWorker = async ({ jobId, workerId, employerId }) => {
  const contract = {
    id: Date.now(),
    jobId,
    workerId,
    employerId,
    status: "active",
  };

  setContracts((prev) => [...prev, contract]);
  return { success: true };
};

const sendMessage = async ({ senderId, receiverId, text }) => {
  const msg = {
    id: Date.now(),
    senderId,
    receiverId,
    text,
  };

  setMessages((prev) => [...prev, msg]);
};

const searchJobs = (query) => {
  return jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );
};

const searchWorkers = (query) => {
  return users.filter(
    (u) =>
      u.role === "worker" &&
      u.skills?.some((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
  );
};


  const fetchUserById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/users/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching employee by ID:", err);
      throw err;
    }
  };

  const createUser = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/users`, userData);
      await fetchUsers(); // ✅ fetchUsers handles loading
      return res.data;
    } catch (err) {
      console.error(`error creating ${userData.role}`, err);
      throw err;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const res = await axios.put(`${API_URL}/users/${id}`, userData);
      await fetchUsers();
      return res.data;
    } catch (err) {
      console.error(`error updating ${userData.role}`, err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`, {
  withCredentials: true,
});
      await fetchUsers();
    } catch (err) {
      console.error(`error deleting user`, err);
      throw err;
    }
  };

  // ---------- Auth ----------
  const loginUser = async (credentials) => {
    console.log("🔹 Sending login request with:", { credentials });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      const { user } = res.data;
      console.log("user in logged in context", user)
      setUser(user);

      if (!user) {
        throw new Error("Invalid login response — user missing");
      }

      return user;
    } catch (err) {
      console.error("Error during loginUser:", err);
      throw err;
    }
  };

  const checkAuth = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/check`, {
      withCredentials: true,
    });
    console.log("🔹 auth check response:", res.data.user);
    setUser(res.data.user);
  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
};


  const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setUser(null);
      navigate("/");
    }
  };


  // inside DataProvider

const forgotPassword = async (email) => {
  try {
    setLoading(true);
    const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    setLoading(false);
    return { success: true, message: res.data.message };
  } catch (err) {
    setLoading(false);
    console.error("Error sending password reset email:", err);
    return { success: false, message: err.response?.data?.message || "Server error" };
  }
};


const resetPassword = async (payload) => {
  try {
    setLoading(true);
    const res = await axios.post(`${API_URL}/auth/reset-password`, payload);
    setLoading(false);
    return { success: true, message: res.data.message };
  } catch (err) {
    setLoading(false);
    console.error("Error resetting password:", err);
    return { success: false, message: err.response?.data?.message || "Server error" };
  }
};

  // ---------- Send Form ----------
  const sendFormData = async (formIdentifier, formData) => {
    try {
      let res;
      switch (formIdentifier) {
        case "createService":
          res = await axios.post(`${API_URL}/services`, formData);
          await fetchAllData();
          break;
        case "createAdvance":
          res = await axios.post(`${API_URL}/advances`, formData);
          await fetchAllData();
          break;
        case "createExpense":
          res = await axios.post(`${API_URL}/expenses`, formData);
          await fetchAllData();
          break;
        case "createClocking":
          res = await axios.post(`${API_URL}/clockings`, formData,);
          await fetchAllData();
          break;
        case "updateClocking":
          res = await axios.put(`${API_URL}/clockings`, formData);
          await fetchAllData();
          break;
        case "openSalon":
        case "closeSalon":
          res =
            formIdentifier === "openSalon"
              ? await axios.post(`${API_URL}/sessions`, formData,  { withCredentials: true })
              : await axios.put(`${API_URL}/sessions`, formData,  { withCredentials: true });
          await fetchSessions();
          break;
        default:
          throw new Error("Unknown form identifier: " + formIdentifier);
      }

      return res.data;
    } catch (err) {
      console.error(`Error in sendFormData for ${formIdentifier}:`, err);
      throw err;
    }
  };

  // ---------- useEffect ----------
   useEffect(()=>{
    checkAuth();
  }, [])



  useEffect(() => {
  // Listen for new appointments
  socket.on("appointment_created", (payload) => {
    console.log("Appointment received via socket:", payload);
  });

  return () => {
    socket.off("appointment_created");
  };
}, []);

  // ---------- Export ----------
  return (
    <DataContext.Provider
      value={{
    jobs,
    applications,
    contracts,
    messages,
    currentUser,

    fetchUsers,
    fetchJobs,
    fetchApplications,
    fetchContracts,
    fetchMessages,

    createJob,
    applyToJob,
    hireWorker,
    sendMessage,

    searchJobs,
    searchWorkers,
        users,
        loading,
        fetchUserById,
        createUser,
        updateUser,
        deleteUser,
        loginUser,
        checkAuth,
        logoutUser,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
