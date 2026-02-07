import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const providerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        serviceCategory: {
            type: String,
            required: [true, 'Service category is required'],
            enum: ['plumbing', 'electrical', 'cleaning', 'carpentry', 'painting', 'other'],
        },
        availability: {
            type: String,
            enum: ['available', 'busy', 'offline'],
            default: 'available',
        },
        role: {
            type: String,
            default: 'provider',
            enum: ['provider'],
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
providerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
providerSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;
