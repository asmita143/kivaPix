import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, updateDoc, doc, getDoc } from "../../../firebase";

// Define a type for the user data
interface UserData {
  name: string;
  phone: string;
  email: string;
  about: string;
  password: string;
}

const GeneralSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserData>({
    name: "",
    phone: "",
    email: "",
    about: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // For storing any errors

  // Fetch user data from Firestore when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        setError("No user is logged in.");
        navigate("/login"); // Redirect to login if no user is logged in
        return;
      }

      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setFormData(userData);
        } else {
          setError("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (auth.currentUser) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, formData as Record<string, any>);
        setIsEditing(false);
        navigate("/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Error updating profile.");
      }
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
        {loading && (
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                About
              </label>
              <input
                type="text"
                name="about"
                value={formData.about}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-between mt-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="w-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-1/2 bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
