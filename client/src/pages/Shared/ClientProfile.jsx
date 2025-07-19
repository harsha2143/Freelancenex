import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Upload,
  Save,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../client/Sidebar";
export default function ClientSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data - replace with actual auth context
  const user = {
    firstName: "John",
    lastName: "Doe",
    primaryEmailAddress: { emailAddress: "john@example.com" },
    imageUrl: "",
    publicMetadata: {
      companyName: "Acme Corp",
      industry: "technology",
      location: "San Francisco, CA",
      description: "A leading technology company",
      website: "https://acme.com",
      phone: "+1 (555) 123-4567"
    }
  };

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    companyName: user?.publicMetadata?.companyName || "",
    industry: user?.publicMetadata?.industry || "",
    location: user?.publicMetadata?.location || "",
    description: user?.publicMetadata?.description || "",
    website: user?.publicMetadata?.website || "",
    phone: user?.publicMetadata?.phone || "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    proposalAlerts: true,
    paymentReminders: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowDirectContact: true,
  });

  const showToast = (title, description, variant = "default") => {
    // Mock toast function - replace with actual toast implementation
    console.log(`Toast: ${title} - ${description}`);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call - replace with actual updateUser function
      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast(
        "Profile updated successfully",
        "Your profile information has been saved."
      );
    } catch (error) {
      showToast(
        "Error",
        "Failed to update profile. Please try again.",
        "destructive"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast(
        "Notification settings updated",
        "Your notification preferences have been saved."
      );
    } catch (error) {
      showToast(
        "Error",
        "Failed to update notification settings.",
        "destructive"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const TabButton = ({ id, children, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === id
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );

  const Switch = ({ checked, onCheckedChange, id }) => (
    <button
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-200"
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"
          }`}
      />
    </button>
  );

  const Select = ({ value, onValueChange, children, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {value || placeholder}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SelectItem = ({ value, onSelect, children }) => (
    <button
      onClick={() => {
        onSelect(value);
        setIsOpen(false);
      }}
      className="w-full px-3 py-2 text-left hover:bg-gray-100"
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 ml-10">
      <Sidebar />
      <div className="max-w-5xl mx-auto space-y-8 lg:ml-64">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
        </div>

        {/* Tabs */}
        <motion.div className="space-y-6 text-black"
          initial={{ opacity: 0.1, y: 80 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="flex flex-wrap gap-2">
            <TabButton id="profile" icon={User}>Profile</TabButton>
            <TabButton id="notifications" icon={Bell}>Notifications</TabButton>
            <TabButton id="privacy" icon={Shield}>Privacy</TabButton>
            <TabButton id="billing" icon={CreditCard}>Billing</TabButton>
            <TabButton id="security" icon={Shield}>Security</TabButton>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <div className="flex items-start gap-6 flex-col sm:flex-row">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h2>
                    <p className="text-gray-600 ml-7">Update your personal details and profile information</p>
                  </div>

                  <div className="flex-1 flex items-center gap-8 mt-5 sm:mt-0">
                    <div>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 ml-20 mt-3"
                      >
                        <Upload className="h-4 w-4" />
                        Change Photo
                      </button>
                      <p className="text-sm text-gray-500 mt-1 ml-24">JPG, PNG up to 5MB</p>
                    </div>
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" class="h-20 w-20 rounded-full" />
                      ) : (
                        <span className="text-lg font-semibold text-gray-600">
                          {user?.firstName?.charAt(0)}
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>


              <div className="space-y-6">
                {/* Profile Picture */}
                {/* <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt="Profile" className="h-20 w-20 rounded-full" />
                    ) : (
                      <span className="text-lg font-semibold text-gray-600">
                        {user?.firstName?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                    placeholder="Your company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      id="industry"
                      value={profileData.industry}
                      onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      placeholder="City, Country"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    id="website"
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Company Description
                  </label>
                  <textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                    placeholder="Brief description of your company..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </h2>
                <p className="text-gray-600">Choose how you want to be notified about activity</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email"
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      description: "Receive push notifications in your browser"
                    },
                    {
                      key: "projectUpdates",
                      label: "Project Updates",
                      description: "Get notified about project milestones and updates"
                    },
                    {
                      key: "proposalAlerts",
                      label: "Proposal Alerts",
                      description: "Get notified when freelancers submit proposals"
                    },
                    {
                      key: "paymentReminders",
                      label: "Payment Reminders",
                      description: "Reminders about pending payments and invoices"
                    },
                    {
                      key: "marketingEmails",
                      label: "Marketing Emails",
                      description: "Receive updates about new features and tips"
                    }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <label htmlFor={setting.key} className="block text-sm font-medium text-gray-700">
                          {setting.label}
                        </label>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                      <Switch
                        id={setting.key}
                        checked={notificationSettings[setting.key]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, [setting.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNotificationUpdate}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </h2>
                <p className="text-gray-600">Control your privacy and data sharing preferences</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700">
                      Profile Visibility
                    </label>
                    <select
                      id="profileVisibility"
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Public - Visible to all freelancers</option>
                      <option value="limited">Limited - Only visible to hired freelancers</option>
                      <option value="private">Private - Not visible to anyone</option>
                    </select>
                  </div>

                  {[
                    {
                      key: "showEmail",
                      label: "Show Email Address",
                      description: "Display your email on your public profile"
                    },
                    {
                      key: "showPhone",
                      label: "Show Phone Number",
                      description: "Display your phone number on your public profile"
                    },
                    {
                      key: "allowDirectContact",
                      label: "Allow Direct Contact",
                      description: "Let freelancers contact you directly"
                    }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <label htmlFor={setting.key} className="block text-sm font-medium text-gray-700">
                          {setting.label}
                        </label>
                        <p className="text-sm text-gray-500">{setting.description}</p>
                      </div>
                      <Switch
                        id={setting.key}
                        checked={privacySettings[setting.key]}
                        onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, [setting.key]: checked })}
                      />
                    </div>
                  ))}
                </div>

                <button
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing Information
                </h2>
                <p className="text-gray-600">Manage your payment methods and billing details</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                          Edit
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <CreditCard className="h-4 w-4" />
                    Add New Payment Method
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Billing Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="State/Province"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="ZIP/Postal Code"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  Save Billing Information
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </h2>
                <p className="text-gray-600">Manage your account security and authentication</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Update Password
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Enable 2FA
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}