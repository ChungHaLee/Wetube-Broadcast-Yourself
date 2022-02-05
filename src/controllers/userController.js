// 웹에서 처음 보여주는 페이지
export const join = (req, res) => res.send('Join US');
export const userEdit = (req, res) => res.send('Edit Profile');
export const userDelete = (req, res) => res.send('Delete Profile');
export const userLogin = (req, res) => res.send('User Logging In');
export const userSearch = (req, res) => res.send('User Searching...');
export const userSee = (req, res) => {
    console.log(req.params);
    return res.send(`This is a User #${req.params.id}`)
};
export const userLogout = (req, res) => res.send( 'User Logging Out');