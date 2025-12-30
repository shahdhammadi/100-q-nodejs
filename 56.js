const updatedUser = await prisma.user.update({
    where: { id: 1 },
    data: { verified: true }
});