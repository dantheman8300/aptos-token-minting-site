# aptos-token-minting-site
Welcome to Overmind's NFT minting site quest! 

# Instructions: 
1. Fork this repo
2. [Set up your Aptos development environment within the app.](#setting-up-your-aptos-environment)
3. [Set up your image hosting server.](#set-up-your-image-hosting-server)
4. [Create your Aptos NFT collection. ](#create-your-nft-collection)
6. [Set up and host your frontend](#setting-up-your-frontend)

# Setting up your Aptos environment
1. Navigate to the `minting-site` directory 
2. Initialize the Aptos CLI tool: `aptos init`
    
    a. Choose desired network

    b. Enter private key or leave blank to generate a new account

    c. Run `aptos account list` to view and confirm aptos account has been added to environment

    At the end of this step, there should be a `.aptos` directory inside of the `minting-site` directory. This folder contains information about the account you generated. Make sure not to share this information as it would jeopardize your account and collection. 

3. Make a copy of `.env.example` and name it `.env`
4. Copy the `private_key` from the `.aptos/config.yaml` file and paste into to the `.env` file under `PRIV_KEY=`. Do not put quotations and DO NOT include the "0x"in the beginning of the key.

    ex. `PRIV_KEY=abcd123`

5. Copy the `account` from the `.aptos/config.yaml` file and paste into to the `.env` file under `COLLECTION_OWNER_ACCOUNT=`. Do not put quotations.

# Set up your image hosting server
1. Create your images and store them all in a folder named `images`
   
    Note: make sure your image file names end with the number of their corresponding spot (starting at 1)

    ex. my image file names are: image1.png, image2.png, image3.png, ...

    For this quest, we recommend using 99 images or less for your NFT collection (plus one for the general collection logo) since hosting more than 100 images will require an upgraded hosting plan. 
2. Visit [Pinata](https://www.pinata.cloud/)
3. Click `start building`
4. Make an account
5. Navigate to the files page in the dashboard.
6. Click `add files` and select `folder`
7. Select the `images` folder containing the labeled NFT images.
8. Upload the images and name the folder `images`
9. Upload your collection's logo image by clicking `add files` > `file` and name it `collection_image.FILE` replacing FILE with the appropriate file extension.

    ex. `collection_image.png`


10. Click the eyeball icons near the images to verify that you can view them on your browser.
11. Copy the `Content Identifier` for `collection_image.png` and paste it into the `.env` file under `COLLECTION_GENERAL_IMAGE_HASH`
12. Copy the `Content Identifier` for `images` and paste it into the `.env` file under `COLLECTION_IMAGES_HASH`

# Create your NFT collection
1. Navigate to the `minting-site` directory if not already there. 
2. Decide and note down the following aspects of your NFT collection

    - **Collection name**: The name of your NFT collection
    - **Collection description**: The description of your NFT collection
    - **Collection max supply**: The maximum number of tokens that can be minted in your collection. (NOTE: for this quest, we reccomend having a max supply of 99 or less. Storing more than 100 iamges on Pinata's pinning service requires an additional payment plan that is not required for this quest.)
    - **Collection uri**: (this is the link to your collection metadata. For this quest, this will be the link to our collection's image)
    - **royalty**: The percentage you want to earn from every sale of a token. NOTE: This percentage is not implemented in the standard and requires additional business logic to implement. It will not be covered in this quest since this is a no-code quest. 
        - **royalty_numerator**: The numerator of the royalty percentage for the collection.
        - **royalty_denominator**: The denominator of the royalty percentage for the collection.

        Ex. if you want a 10% (1/10) royalty: numerator = 1 and denominator = 10

    - **mutable description**: Whether or not you want to be able to change the description of the collection in the future. true for yes and false for no
    - **mutable royalty**: whether or not you want to be able to change the collection's royalty percentage in the future. true for yes and false for no. 
    - **mutable uri**: Whether or not you want to be able to change the collection's uri in the future. true for yes and false for no. 
    - **mutable token description**: Whether or not you want to be able to change each token's description after its initial mint. true for yes and false for no. 
    - **mutable token name**: Whether or not you want to be able to change each token's name after its initial mint. true for yes and false for no
    - **mutable token properties**: Whether or not you want to be able to change each token's properties after its initial mint. true for yes and false for no. 
    - **mutable token uri**: Whether or not you want to be able to change each token's uri after its initial mint. true for yes and false for no. 
    - **tokens burnable by creator**: Whether you want the ability to burn tokens regardless of who owns them. true for yes and false for no. 
    - **tokens freezable by creator**: Whether you want the ability to freeze tokens regardless of who owns them. true for yes and false for no. 

3. Run the following command (with your values replace the CAPITAL_VALUES):
        
        aptos move run --function-id 0x4::aptos_token::create_collection --args string:"COLLECTION_DESC_HERE" u64:SUPPLY_HERE string:"COLLECTION_NAME_HERE" string:"COLLECTION_URI_HERE" bool:MUTABLE_DESCRIPTION bool:MUTABLE_ROYALTY bool:MUTABLE_URI bool:MUTABLE_TOKEN_DESCRIPTION bool:MUTABLE_TOKEN_NAME bool:MUTABLE_TOKEN_PROPERTIES bool:MUTABLE_TOKEN_URI bool:TOKENS_BURNABLE_BY_CREATOR bool:TOKENS_FREEZABLE_BY_CREATOR u64:ROYALTY_NUMERATOR u64:ROYALTY_DENOMINATOR

  ex.

    aptos move run --function-id 0x4::aptos_token::create_collection --args string:"This is your very own NFT minting website! Follow along with Overmind's guide on how to create your own collection and set up your minting site! Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi." u64:99 string:"developer token" string:"https://overmind.xyz/" bool:true bool:true bool:true bool:true bool:true bool:true bool:true bool:false bool:false u64:1 u64:100

4. Enter yes for the gas prompt

5. Copy the `transaction hash` outputed from the command and enter the hash at https://explorer.aptoslabs.com/ (NOTE: remember to visit the correct network)

6. Navigate to the `Changes` section and find the change with type: `write resource` and the `Data` type: `0x4::collection::Collection`. It should look similar to the below example.

            {
                "type": "0x4::collection::Collection",
                "data": {
                    "creator": "0xfc31278fb600a9bacd0029e7ad1f658f7a3f3f7248774e87f3b24111c5140141",
                    "description": "This is your very own NFT minting website! Follow along with Overmind's guide on how to create your own collection and set up your minting site! Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
                    "mutation_events": {
                    "counter": "0",
                    "guid": {
                        "id": {
                        "addr": "0x88fcd25695faefc1d0dbffedfceea8275df28a3d975da0642debac822f2fbe7",
                        "creation_num": "1125899906842627"
                        }
                    }
                    },
                    "name": "developer token",
                    "uri": "https://overmind.xyz/"
                }
                }

7. Find `data > mutation_events > guid > id > addr` and copy the address into the `.env` file under `COLLECTION_ADDRESS`. Do not use quotations and do not include the "0x" in the beginning of the address.

        ex. COLLECTION_ADDRESS=88fcd25695faefc1d0dbffedfceea8275df28a3d975da0642debac822f2fbe7

8. Enter collection name, description, and max supply in the `.env` file. Use quotations for the collect name and description.

        ex
        COLLECTION_NAME="developer token"
        COLLECTION_DESCRIPTION="This is your very own NFT minting website! Follow along with Overmind's guide on how to create your own collection and set up your minting site! Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        COLLECTION_MAX_SUPPLY=99

# Setting up your frontend
1. Fill out the desired social media URLs that you want to use for your collection. All social media links are optional. Leave any blank that are not desired.
2. Visit [vercel](https://vercel.com/) and sign up/in with the github account you are using. 
3. Navigate to the `Import Git Repository` and import this forked repo.
4. In `Configure Project`, select `Next.js` for `Framework Preset` and select `minting-site` for `Root directory`.
6. Copy the conents of the .env file and paste it into `Environment Variables: EXAMPLE_NAME`
7. Click deploy and wait for the build and deployment to complete
8. On the congratulations page, select `continue to dashboard`
9. click `visit` to visit your NFT minting site!


aptos account fund-with-faucet --account 0xf5765b8561238764a44ebfea94abffd8c4f5f33a1f88d5888ee7e15a430b13a5

aptos move run --function-id 0x4::aptos_token::create_collection --args string:"my collection" u64:500 string:"DanCoin" string:"uri" bool:true bool:true bool:true bool:true bool:true bool:true bool:true bool:true bool:true u64:0 u64:1
