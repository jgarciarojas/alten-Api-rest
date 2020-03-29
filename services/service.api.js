const Factory = require('../model/factory');

getFactory = (req, res) =>{
    console.log('GET /api/v1/feature');
    Factory.find({}, (err, factory) => {
        if (err) return res.status(500).send({ message: `ERROR ${err}` });
        if (!factory) return res.status(404).send({ message: 'Factory not found exception' });
        res.status(200).send({ factory });
    });
};

getFactoryById = (req, res) =>{
    console.log('GET BY ID /api/v1/feature/:factoryId');
    let factoryId = req.params.factoryId;
    Factory.findById(factoryId, (err, factory) => {
        if (err) return res.status(500).send({ message: `ERROR ${err}` });
        if (!factory) return res.status(404).send({ message: 'Factory not found exception' });
        res.status(200).send({ factory });
    });
};

putFactory = (req, res) => {
    console.log('PUT /api/v1/feature/:factoryId');
    let factoryId = req.params.factoryId;
    let featuresUpdate = req.body;
    Factory.findById(factoryId, (err, factory) => {
      if (err) return res.status(500).send({ message: `ERROR ${err}` });
      if (!factory) return res.status(404).send({ message: 'Factory not found exception' });
      featuresUpdate.features.forEach(element => {
        var control = {
          name: element.name,
          active: element.active,
          control: []
        };
        control.control.push(element.control[0]);
        factory.features.push(control);
      });
      console.log('body',featuresUpdate.features);
      console.log('before', factory.features);
      console.log('after', factory.features);
      Factory.findOneAndUpdate(factoryId, factory, (err, factoryUpdate) => {
        if (err) return res.status(500).send({ message: `ERROR ${err}` });
        if (!factoryUpdate) return res.status(404).send({ message: 'Factory not found exception' });
          res.status(201).send({ factory: factory });
      });
    });
};

deleteFactory = (req, res) => {
    console.log('DELETE /api/v1/feature');
    let factoryId = req.params.factoryId;
    Factory.findById(factoryId, (err, factory) => {
      if (err) return res.status(500).send({ message: `ERROR ${err}` });
      factory.remove(err => {
        if (err) return res.status(500).send({ message: `ERROR ${err}` });
        res.status(200).send({ message: 'Factory is delete' });
      });
    });
};

postFactory = (req, res) => {
    console.log('POST /api/v1/feature');
    console.log('BODY', JSON.stringify(req.body));
    let factory = new Factory();
    factory.set(req.body.factory[0]);
    //#region TEST
    //remove the id which the client sends since it is a new pvdc price
    // factory.name =  "Part A";
    // factory.features = [{
    //     name : "Feature Name",
    //     control: [{
    //       measure: [{
    //         name: "x",
    //         dev: 0,
    //         devOut: 0,
    //         controlColor: "#ffff00"
    //       },
    //       { 
    //         name: "y",
    //         dev: 0,
    //         devOut: 0,
    //         controlColor: "#91ff1b"
    //     },{
    //       name: "z",
    //       dev: 0,
    //       devOut: 0,
    //       controlColor: "#ff2c14"
    //     },{
    //       name:"diameter",
    //       dev: 0,
    //       devOut: 0,
    //       controlColor: "#ff2c15"
    //     },
    //     {
    //       name: "x",
    //       dev: 0,
    //       devOut: 0,
    //       controlColor: "#ffff00"
    //     },
    //     {
    //       name: "y",
    //       dev: 0,
    //       devOut: 0,
    //       controlColor: "#91ff1b"
    //     },{
    //       name: "z",
    //       dev: 0,
    //       devOut: 0,
    //       controlColor: "#ff2c14"
    //     },{
    //       name:"diameter",
    //       dev: 0,
    //       devOut: 0,
    //       controlColor: "#ff2345"
    //     } 
    //     ]
    //     }]
    // }];
    //#endregion
    factory.save((err, factoryStored) => {
      if (err) throw err;
      res.status(200).send({ factory: factoryStored });
    });
}

module.exports = {
    getFactory,
    getFactoryById,
    putFactory,
    deleteFactory,
    postFactory
};