import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";
import { IError } from "@/interface/error.interface";

interface IFlushCartResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

const FlushCartButton = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation<IFlushCartResponse, IError>({
    mutationKey: ["flush-cart"],
    mutationFn: async () => {
      return await axiosInstance.delete("/cart/flush");
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["cart-list"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  if (isPending) {
    return <CircularProgress color="success" />;
  }

  return (
    <Tooltip title="Clear Cart">
      <IconButton
        onClick={() => {
          mutate();
        }}
        color="error"
        sx={{
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(211, 47, 47, 0.1)",
            transform: "scale(1.1)",
          },
        }}
      >
        <DeleteSweepIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default FlushCartButton;
