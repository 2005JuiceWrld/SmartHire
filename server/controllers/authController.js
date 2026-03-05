import { hashString, compareString, createJWT } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import Users from "../models/userModel.js";

// Register
export const register = async (req, res, next) => {
  const { firstName, lastName, email, password, role, skills } = req.body;
  // Validate Fields
  if (!firstName || !lastName || !email || !password) {
    next("Provide Required Fields!");
    return;
  }

  try {
    const selectedRole = role || "candidate";
    const userExist = await Users.findOne({ email, role: selectedRole });

    if (userExist) {
      next(`You have already registered as a ${selectedRole} with this email address.`);
      return;
    }
    const hashedPassword = await hashString(password);
    
    // Create user object
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: true, // Auto-verify for development
      role: selectedRole,
    };

    // If candidate and skills are provided, add them
    if (selectedRole === "candidate" && skills) {
        // Ensure skills is an array
        userData.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    }

    const user = await Users.create(userData);

    res.status(201).json({
      success: true,
      message: "Registration Successful! You can now login.",
      user, 
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    // Validation
    if (!email || !password) {
      next("Invalid User Credentials");
      return;
    }

    // Check how many accounts exist for this email
    const usersFound = await Users.find({ email }).select("+password");

    if (usersFound.length === 0) {
      next("Invalid Email or Password");
      return;
    }

    // If multiple roles exist and user hasn't selected one yet
    if (usersFound.length > 1 && !role) {
      return res.status(200).json({
        success: true,
        needsRoleSelection: true,
        roles: usersFound.map(u => u.role),
        message: "Multiple accounts found. Please select your role."
      });
    }

    // Find the specific user (either the only one, or the one with the selected role)
    const targetRole = role || usersFound[0].role;
    const user = usersFound.find(u => u.role === targetRole);

    if (!user) {
      next(`No ${targetRole} account found for this email.`);
      return;
    }

    // Compare Password
    const isMatch = await compareString(password, user?.password);
    if (!isMatch) {
      next("Invalid Email or Password");
      return;
    }

    await user.populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });

    user.password = undefined;
    const token = createJWT(user?._id);

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};
