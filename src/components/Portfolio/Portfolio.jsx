import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PageHeader from "../PageHeader/PageHeader";
import CodepenSamples from "components/CodepenSamples/CodepenSamples";
import ProjectSection from "../ProjectSection/ProjectSection";
import RaspberryPiImage from "@assets/raspberry-pi.png";
import { contentfulClient } from "../../utils/contentful"

const Portfolio = () => {
  const [codeEntries, setCodeEntries] = useState({ items: [] })
  useEffect(() => {
    async function getCodeEntries() {
      const results = await contentfulClient.getEntries({
        content_type: 'codepenSnippet'
      })
      setCodeEntries(results)
    }
    getCodeEntries()
  }, [])
  const codepenSnippets = codeEntries.items.filter((entry) => entry.fields.contentType === 'Snippet')

  return (
    <div>
      <PageHeader description="A few web snippets and projects I enjoyed making.">
        Code
        </PageHeader>
      <div className={styles.samples}>
        <CodepenSamples codepenSamples={codepenSnippets} />
        <ProjectSection
          title="Virtual Couch Gaming"
          renderDescription={() => (
            <p>
              A proof of concept multiplayer game using your mobile phone as
                gamepads. Play locally or remotely! Load the{" "}
              <a href="https://tingchen.me/pong-client/index.html">
                host client
                </a>{" "}
                on a desktop to try it out.
            </p>
          )}
        >
          <video autoPlay={true} className={styles.pongVideo} loop={true}>
            <source
              src="https://s3-us-west-1.amazonaws.com/tingchen.me/demo/pong-demo.mp4"
              type="video/mp4"
            />
              Your browser does not support the video tag.
            </video>
        </ProjectSection>
        <ProjectSection
          title="IoT Radio Controlled Outlet w/ Raspberry Pi"
          renderDescription={() => (
            <>
              <p>
                A few years ago I bought{" "}
                <a href="https://www.amazon.com/gp/product/B00DQ2KGNK/">
                  outlets that are controlled using 433MHz radio signals
                  </a>
                  . Unfortunately, these devices required a specific remote to
                  transmit signals to turn the outlets on or off; losing the
                  remote would mean that I could not control the outlets.
                  Additionally, there was no way to control these devices
                  through the internet.
                </p>
              <p>
                I wanted to be able to control these devices on my local
                network, or better yet, using a voice assistant such as Alexa.
                  I bought a{" "}
                <a href="https://www.raspberrypi.org/products/raspberry-pi-4-model-b/">
                  Raspberry Pi
                  </a>{" "}
                  and a{" "}
                <a href="https://www.amazon.com/gp/product/B076Q64MBQ/">
                  radio receiver/transmitter
                  </a>{" "}
                  set so that I could convert my outlets into a smart device.
                </p>
              <p>
                After{" "}
                <a href="https://www.instructables.com/id/RF-433-MHZ-Raspberry-Pi/">
                  reading the radio signals
                  </a>{" "}
                  from the remote and storing it into a file, I then built an{" "}
                <a href="https://github.com/tingc10/radio">Express server</a>{" "}
                  that had a basic API interface to execute commands to transmit
                  the signal. To make calls to the server, I built a React based{" "}
                <a href="https://tingchen.me/radio-ui/">remote controller</a>.
                  I was then able to add new features such as a timer, which
                  then allowed me to turn my window AC unit into a smart device.
                  Finally, I built a custom Alexa skill and made my server
                  available via Ngrok so I could control the devices by voice.
                  With that I was able to turn my radio controlled devices into
                  a smart appliance 🎉
                </p>
            </>
          )}
        >
          <div className={styles.imageContainer}>
            <img
              src={RaspberryPiImage}
              alt="Radio transmitter and receiver connected to Raspberry Pi device"
              className={styles.image}
            />
          </div>
        </ProjectSection>
      </div>
    </div>
  );
}

export default Portfolio;
