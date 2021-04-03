export const allAccess = (req, res) => {
    res.status(200).send('Public Content.');
};

export const userBoard = (req, res) => {
    res.status(200).send('User Content.');
};

export const managerBoard = (req, res) => {
    res.status(200).send('manager Content.');
};

export const teamleaderBoard = (req, res) => {
    res.status(200).send('teamleader Content.');
};
