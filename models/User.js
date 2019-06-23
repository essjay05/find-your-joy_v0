// REQUIRE CONSTANTS
const
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

// IMAGE SCHEMA (nested in PROJECT Schema)
const imageSchema = new mongoose.Schema ({
    filename: { type: String },
    description: { type: String }
})

// PROJECT SCHEMA (nested in USER Schema)
const projectSchema = new mongoose.Schema ({
    title: { type: String },
    description: { type: String },
    techUsed: { type: String },
    deployedLink: { type: String },
    gitHubLink: { type: String },
    date: { type: Date },
    images: [imageSchema]
}, { timestamps: true })

// USER SCHEMA
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    profileImg: { type: String },
    aboutUser: { type: String },
    skills: [{ type: String }],
    linkedIn: { type: String }, 
    github: { type: String },
    website: { type: String },
    projects: [projectSchema]
}, { timestamps: true })

// Generate/bcrypt password

// Check valid password

// For User edit check and save new
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this.generateHash(this.password)
    } next ()
})

// Export User, Projects, and Images Models
const
    User = mongoose.model('User', userSchema),
    Project = mongoose.model('Project', projectSchema),
    Image = mongoose.model('Image', imageSchema);

module.exports = User, Project, Image;
