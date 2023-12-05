
const router = express.Router();

router.get('/preferences/:userID', async (req, res) => {
    try{
        const userID = req.params.userID;
        const preferences = await getPreferences(userID);
        res.status(200).json(preferences);

        if (!userID) {
            res.status(404).send('User not found');
        }
        res.json(user.Preference || {});
    }catch(error){
        console.error(error);
        res.status(500).json(error);

    }
  } catch (error) {
    handleErrors(res, error);
  }
});


router.add('/preferences/:userID', async (req, res) => {
    try{
        const userID = req.params.userID;
        const preferences = await getPreferences(userID);
        res.status(200).json(preferences);

        if (!userID) {
            res.status(404).send('User not found');
        }
        res.json(user.Preference || {});
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
});

router.delete('/preferences/:userID', async (req, res) => {
    try{
        const userID = req.params.userID;
        const preferences = await getPreferences(userID);
        res.status(200).json(preferences);

        if (!userID) {
            res.status(404).send('User not found');
        }
        res.json(user.Preference || {});
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;

