const Lands = require('./lands');

class Container {
  constructor() {
    this.properties = [];
  }

  addProperty(titleNo, geoData, recipient, landSize, price){
    // if (Container.titleRegistered(titleNo)) {
    //   console.log('Land Already registered');
    //   return;
    // }

      //Create a new land object
      const lands = new Lands();
      const newPlot = Lands.addLand(titleNo, geoData, recipient, landSize, price);
      // add to Properties
      this.properties.push(newPlot);
      return newPlot;
  }


  search(key){
    const results = this.properties.find(land => land.id === key);
    if (results) {
      return({
        status: "Land found",
        results
      });
    }
    return({
      status: "Land not found"
    });
  }

  static titleRegistered(titleNo){
    if (this.properties.length === 0) {
      return false;
    }
    const land = this.properties.find(plot => plot.titleNo === titleNo);
    return Object.keys(land).length;
  }


  static landExists(id){
    const land = this.properties.find(plot => plot.id === id);
    return Object.keys(land).length;
  }


  static verifyOwner(publicKey, landId){
    const land = this.properties.find(t => t.id === landId);
      if (this.landExists(land)) {
        if (land.ownerData.publicKey === publicKey) {
          return  true;
        }
      } else {
        return false;
      }
  }

  transferOwnership(data, recipient, price){
    const { id, titleNo, geoData, ownerData, landSize } = data;
    if (!this.landExists(id)) {
      console.log('Land does not exist');
      return ;
    }

    if (this.verifyOwner(ownerData.publicKey, id)) {
      // Check account balance
      const plot = this.properties.find(land => land.id == id);

      //Create a new land object
      const lands = new Lands();
      const newPlot = lands.add(titleNo, geoData, recipient, landSize, price);

      return newPlot;
    }
  }
}

module.exports = Container;
