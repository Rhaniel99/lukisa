import { Form } from "@inertiajs/react";
import { useRef } from "react";
import { Send } from "lucide-react";
import { submitOnEnter } from "@/Utils/formHelpers";
import { Memory, isMemory } from "@/Types/Memories";

interface CommentFormProps {
  memoryId: string;
  onUpdateMemory: (memory: Memory) => void;
}

export function CommentForm({ memoryId, onUpdateMemory }: CommentFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
<Form
  action={route("memo.comments.store", {
    memory: memoryId,
    comments_page: 1,
  })}
  method="post"
  resetOnSuccess
onSuccess={(page) => {
  const updated = page.props.selectedMemoryDetails;

  if (isMemory(updated)) {
    onUpdateMemory(updated);
  }
}}
>

      {({ processing }) => (
        <div className="flex items-center gap-2 bg-white border-2 border-[#E8DCC4] rounded-full px-4 py-2">
          <input
            ref={inputRef}
            name="content"
            placeholder="Adicione um comentário..."
            className="flex-1 bg-transparent outline-none text-sm text-[#3D2817] placeholder:text-[#A69580]"
            disabled={processing}
            onKeyDown={(e) => submitOnEnter(e, inputRef)}
          />

          <button
            type="submit"
            disabled={processing}
            className="text-[#6B4E3D] disabled:opacity-30 hover:text-[#3D2817] disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}
    </Form>
  );
}