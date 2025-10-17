import { Response } from 'express';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Utility to build case-insensitive regex
const iRegex = (v: string) => new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

/**
 * @desc   List entrepreneurs (directory)
 * @route  GET /api/entrepreneurs
 * @access Public
 *
 * Query params:
 * - q: string (search in name/bio/village/district/skills)
 * - district: string (exact, case-insensitive)
 * - village: string (exact, case-insensitive)
 * - skill: string (match any)
 * - skills: comma-separated (require ALL)
 * - onlyActive: 'true' | 'false' (default true)
 * - page: number (default 1)
 * - limit: number (default 12)
 * - sort: string (e.g. "-createdAt", "name", default "-createdAt")
 */
export const listEntrepreneurs = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
        q,
        district,
        village,
        skill,
        skills,
        onlyActive = 'true',
        page = '1',
        limit = '12',
        sort = '-createdAt',
    } = req.query as Record<string, string | undefined>;

    const roleValue = 'entrepreneur'; // or 'entpruner' if you must keep the typo

    const filter: Record<string, unknown> = { role: roleValue };
    if (onlyActive !== 'false') filter.isActive = true;

    if (district) filter.district = iRegex(district);
    if (village) filter.village = iRegex(village);

    // Skills filtering
    if (skills) {
        // require ALL listed skills (case-insensitive)
        const all = skills.split(',').map(s => iRegex(s.trim())).filter(Boolean);
        if (all.length) filter.skills = { $all: all };
    } else if (skill) {
        // match ANY one skill
        filter.skills = { $in: [iRegex(skill)] };
    }

    // Keyword search
    if (q) {
        const r = iRegex(q);
        filter.$or = [
            { name: r },
            { bio: r },
            { village: r },
            { district: r },
            { skills: r },
        ];
    }

    const pageNum = Math.max(parseInt(String(page), 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(String(limit), 10) || 12, 1), 100);
    const skip = (pageNum - 1) * limitNum;

    const projection =
        'name village district bio skills photo contactPrefs lankaQR isActive createdAt';

    const [items, total] = await Promise.all([
        User.find(filter)
            .select(projection)
            .sort(sort as string)
            .skip(skip)
            .limit(limitNum)
            .lean(),
        User.countDocuments(filter),
    ]);

    res.status(200).json({
        success: true,
        data: items,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum),
        },
    });
});

/**
 * @desc   Get single entrepreneur by id
 * @route  GET /api/entrepreneurs/:id
 * @access Public
 */
export const getEntrepreneurById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const roleValue = 'entrepreneur'; // or 'entpruner'

    const user = await User.findOne({ _id: id, role: roleValue })
        .select('-password') // ensure password never leaks
        .lean();

    if (!user) throw new AppError('Entrepreneur not found', 404);

    res.status(200).json({
        success: true,
        data: user,
    });
});
