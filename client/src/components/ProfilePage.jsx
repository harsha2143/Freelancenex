export default function ProfilePage({ userData }) {
    if (!userData) return null;

    const { fullName, email, profileImage, description } = userData;

    return (
        <div className="w-80 min-h-[95vh] bg-gray-100 border border-gray-200  overflow-hidden mt-6">
            {/* Header */}
            <div className="px-4 py-3 bg-white border-b border-gray-200">
                <h1 className="text-gray-800 text-xl font-semibold">Account Settings</h1>
            </div>

            {/* Profile Info */}
            <div className="px-4 py-4 mt-4">
                <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="upload-photo"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const imageURL = URL.createObjectURL(file);
                                    // TODO: update state or upload to server
                                    console.log("Selected file:", file);
                                }
                            }}
                        />

                        {/* Avatar wrapped with label to open file picker */}
                        <label htmlFor="upload-photo" className="cursor-pointer block relative">
                            <img
                                src={profileImage || "/user.jpg"}
                                alt="avatar"
                                className="w-16 h-16 rounded-full object-cover"
                            />

                            {/* PNG camera icon overlay */}
                            <img
                                src="https://img.icons8.com/?size=100&id=85307&format=png&color=000000"
                                alt="Camera icon"
                                className="absolute bottom-0 right-0 w-5 h-5 bg-purple-400 rounded-full border-2 border-white bg-purple-100 p-0.5"
                            />
                        </label>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-gray-900 break-words">  {email?.split("@")[0]}</h2>
                        <p className="text-sm text-gray-600 break-words">{email}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                    {description || `Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam`}
                </p>
                
            </div>
        </div>
    );
}
