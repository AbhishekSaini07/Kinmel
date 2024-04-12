
module.exports = (sequelize,DataTypes) => {
    const Connections =  sequelize.define("connections",{
        cid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        fid: {
            type: DataTypes.INTEGER,
            allowNull: false

        }
    },{
        tableName: "connections",
        timestamps: false,
    }
        
    );
    return Connections;
}