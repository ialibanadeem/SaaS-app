"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { AnimatePresence, motion } from "framer-motion";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      console.log("VAPI message received:", message);

      if (
        message?.type === "transcript" &&
        message?.transcriptType === "final"
      ) {
        const newMessage = {
          role: message.role || "assistant",
          content: message.transcript || "",
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };
  const handleCall = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      setCallStatus(CallStatus.CONNECTING);

      const assistantOverrides = {
        variableValues: { subject, topic, style },
        clientMessages: ["transcript"],
        serverMessages: [],
      };

      /* @ts-expect-error aidhi adih  */
      await vapi.start(configureAssistant(voice, style), assistantOverrides);
    } catch (error) {
      console.error("Failed to start session:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await vapi.stop();
      setCallStatus(CallStatus.FINISHED);
    } catch (error) {
      console.error("Failed to stop session:", error);
    }
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-1001"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting"
              : "Start Session"}
          </button>
        </div>
      </section>

      <section className="transcript">
       <div className="transcript-message relative flex flex-col justify-end items-center h-full pb-12 px-4 text-center overflow-hidden">
  <AnimatePresence mode="wait">
    {messages.length > 0 && (
      <motion.div
        key={messages[messages.length - 1].content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={cn(
          "max-w-3xl px-6 py-3 rounded-2xl shadow-lg",
          "bg-white/80 backdrop-blur-sm text-lg md:text-2xl font-medium leading-snug",
          messages[messages.length - 1].role === "assistant"
            ? "text-gray-900"
            : "text-primary"
        )}
      >
        {messages[messages.length - 1].role === "assistant"
          ? `${name.split(" ")[0].replace(/[.,]/g, "")}: ${
              messages[messages.length - 1].content
            }`
          : `${userName}: ${messages[messages.length - 1].content}`}
      </motion.div>
    )}
  </AnimatePresence>
</div>

        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
