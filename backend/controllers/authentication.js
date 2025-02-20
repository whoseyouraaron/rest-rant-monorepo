___  
router.post('/super-important-route', async (req, res) => {
    if(req.session.userId) {
        console.log('Do the really important thing')
        res.send('Done')
    } else {
        console.log('You are not authorized to do that thing')
        res.send('Denied')
    }
    
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        req.session.userId = user.userId
        res.json({ user })                                       
    }
})

router.get('/profile', async (req, res) => {
    console.log(req.session.userId)
    try {
        let user = await User.findOne({
            where: {
                userId: req.session.userId                   
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})
