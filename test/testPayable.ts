import {expect} from "chai";
import {ethers} from "hardhat";

describe("Payable Example", function(){

let contractPayable:any;
let ContractPayable:any;
let owner : any;
let address1 : any;
let address2 : any;
let balance:any;
const provider = ethers.provider;
        
   
it("#Test Contract Deployment", async function(){

try {
[owner, address1, address2] = await ethers.getSigners();
contractPayable = await ethers.getContractFactory("ContractPayable");
ContractPayable = await contractPayable.deploy(owner.address,{value:ethers.utils.parseEther("10")});
await ContractPayable.deployed();

//Assert
balance = String(await ContractPayable.connect(owner).getContractBalance());
console.log(`Balance0: ${balance}`);

//Test
expect(balance).to.equal(ethers.utils.parseEther("10").toString());
} catch (error) {
        
    console.log((<Error>error).message);
    //console.log((error as Error).message); Another way to type cast the error message


}

})

it("#Test Deposit", async function(){

try {

//Test

await ContractPayable.connect(owner).deposit({value:ethers.utils.parseEther("10")});

balance = String(await ContractPayable.connect(owner).getContractBalance());
console.log(`Balance2: ${balance}`);

expect(balance).to.equal(ethers.utils.parseEther("20").toString());

} catch (error) {
        
    console.log((<Error>error).message);
    //console.log((error as Error).message); Another way to type cast the error message


}



})




it("#Test Withdraw", async function(){


    try {

        //Test
        
        await ContractPayable.connect(owner).withdrawByOwner(ethers.utils.parseEther("5"));
        
        balance = String(await ContractPayable.connect(owner).getContractBalance());
        console.log(`Balance3: ${balance}`);
        
        expect(balance).to.equal(ethers.utils.parseEther("15").toString());
        
        } catch (error) {
                
            console.log((<Error>error).message);
            //console.log((error as Error).message); Another way to type cast the error message
        
        
        }


})

it("#Test Transfer By Owner", async function(){

    try {

        //Test
        let addressBalance:any = (await provider.getBalance(address2.address)).toString();
        console.log(`Transfer Address Balance 1: ${addressBalance}`);
        await ContractPayable.connect(owner).transferToAddress(address2.address, ethers.utils.parseEther("7"));
        
        balance = String(await ContractPayable.connect(owner).getContractBalance());
        console.log(`Balance3: ${balance}`);

        addressBalance = (await provider.getBalance(address2.address)).toString();
        console.log(`Transfer Address Balance 2: ${addressBalance}`);
        
        expect(balance).to.equal(ethers.utils.parseEther("8").toString());
        
        } catch (error) {
                
            console.log((<Error>error).message);
            //console.log((error as Error).message); Another way to type cast the error message
        
        
        }

})



})