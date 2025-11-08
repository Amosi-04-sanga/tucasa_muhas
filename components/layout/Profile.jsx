"use client";
import React, { useState, useEffect, useRef } from "react";
import { account, databases, storage, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { Query } from "appwrite";

const Profile = ({ isOpen, onClose, user }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const router = useRouter();
  const fileInputRef = useRef(null);
  const STORAGE_BUCKET_ID = "6866981d001e9d0b62dd";

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && isOpen) {
        try {
          setLoading(true);
          // Query the database for user information
          const response = await databases.listDocuments(
            "68668bb2002232c78c64", // database ID
            "68668c13002021cd8a17", // collection ID
            [
              // Query for documents where userId matches the current user
              Query.equal("userId", user.$id)
            ]
          );
          
          if (response.documents.length > 0) {
            const doc = response.documents[0];
            setUserData(doc);
            if (doc.profilePhotoId) {
              const url = storage.getFilePreview(
                STORAGE_BUCKET_ID,
                doc.profilePhotoId,
                200,
                200
              );
              setProfilePhotoUrl(String(url));
            } else {
              setProfilePhotoUrl(null);
            }
          } else {
            setProfilePhotoUrl(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, isOpen]);

  const handleOpenFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file || !userData) return;
    setUploadError("");
    try {
      setIsUploading(true);
      const created = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), file);
      const newFileId = created.$id;
      // Optimistically update the preview URL (cache-bust to ensure refresh)
      const previewUrl = storage.getFilePreview(STORAGE_BUCKET_ID, newFileId, 200, 200);
      setProfilePhotoUrl(`${previewUrl}&t=${Date.now()}`);

      if (userData.profilePhotoId) {
        try {
          await storage.deleteFile(STORAGE_BUCKET_ID, userData.profilePhotoId);
        } catch (_) {}
      }

      await databases.updateDocument(
        "68668bb2002232c78c64",
        "68668c13002021cd8a17",
        userData.$id,
        { profilePhotoId: newFileId }
      );

      setUserData((prev) => ({ ...prev, profilePhotoId: newFileId }));
    } catch (err) {
      setUploadError("Failed to upload photo. Please try again.");
      console.error("Profile photo upload error:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Prevent background (homepage) scrolling when profile is open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      onClose();
      router.push('/');
      // Refresh the page to update navbar state
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed top-[10vh] max-w-[500px] mx-auto pb-8 inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Full page profile */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark"></div>
            </div>
          ) : userData ? (
            <div className="space-y-4">
              {/* Profile Header */}
              <div className="text-center pb-4 border-b border-gray-200">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  {profilePhotoUrl ? (
                    <img
                      src={profilePhotoUrl}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleOpenFilePicker}
                    className="absolute -bottom-1 border-[1px] border-white -right-1 bg-primary-dark text-white w-6 h-6 cursor-pointer rounded-full flex items-center justify-center shadow"
                    title="Change photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M4 7a3 3 0 0 1 3-3h2l1.2-1.6A2 2 0 0 1 11.8 2h4.4a2 2 0 0 1 1.6.8L19 4h1a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7zm8 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2.5A2.5 2.5 0 1 1 12 9a2.5 2.5 0 0 1 0 5z"/>
                    </svg>
                  </button>
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <h3 className="text-xl font-semibold text-gray-800">{userData.name}</h3>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600 text-sm"><span className="capitalize">{userData.status}</span> of Tucasa muhas</p>
                {uploadError && (
                  <p className="mt-2 text-sm text-red-600">{uploadError}</p>
                )}
              </div>

              {/* User Information */}
              <div className="space-y-3 p-2 bg-primary-light">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Gender</label>
                  <p className="capitalize">{userData.gender}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="capitalize">{userData.adress}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Baptism Status</label>
                  <p className="capitalize">{userData.baptism_status}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="">{userData.phone}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Course</label>
                  <p className="">{userData.course}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Year of Study</label>
                  <p className="">{userData.year_of_study}</p>
                </div>
              </div>

              
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No user data found</p>
            </div>
          )}
          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full bg-primary-dark cursor-pointer text-white py-3 px-4 rounded-lg font-semibold transition duration-200"
                >
                  Logout
                </button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
