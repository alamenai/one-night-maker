const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getFirstLikedPost = async () => {
	return prisma.post.findFirst();
};

const updatePostLikedStatus = async (id, liked) => {
	return prisma.post.update({
		where: { id },
		data: { liked },
	});
};

module.exports = { getFirstLikedPost, updatePostLikedStatus };
